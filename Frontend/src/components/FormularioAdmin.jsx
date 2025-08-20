import React, { useState, useEffect } from 'react';
import '../assets/styles/FormularioAdmin.css';

const FormularioAdmin = ({ 
  campos, 
  onSubmit, 
  botonesPersonalizados = [], 
  valoresIniciales = {}, 
  validacionesPersonalizadas = {} // 👈 NUEVO: reglas de validación
}) => {
  const [valores, setValores] = useState({});
  const [previewImagen, setPreviewImagen] = useState({});
  const [errores, setErrores] = useState({}); // 👈 NUEVO: manejo de errores

  // Cargar valores iniciales
  useEffect(() => {
    if (Object.keys(valoresIniciales).length === 0) return;

    const valoresFormateados = {};
    for (const campo of campos) {
      const valor = valoresIniciales[campo.nombre];
      if (campo.tipo === 'datetime-local' && valor) {
        const fecha = new Date(valor);
        const offset = fecha.getTimezoneOffset();
        fecha.setMinutes(fecha.getMinutes() - offset);
        valoresFormateados[campo.nombre] = fecha.toISOString().slice(0, 16);
      } else if (campo.tipo === 'select' && campo.multiple && Array.isArray(valor)) {
        valoresFormateados[campo.nombre] = valor.map(v => String(v));
      } else {
        valoresFormateados[campo.nombre] = valor ?? (campo.multiple ? [] : '');
      }
    }
    setValores(valoresFormateados);
  }, [JSON.stringify(valoresIniciales)]);

  // Manejo de cambios
  const manejarCambio = (e) => {
    const { name, type, value, checked, files, multiple, options } = e.target;

    if (type === 'file') {
      const archivo = files[0];
      setValores({ ...valores, [name]: archivo });

      if (archivo && archivo.type.startsWith('image/')) {
        const urlTemp = URL.createObjectURL(archivo);
        setPreviewImagen({ ...previewImagen, [name]: urlTemp });
      }
    } else if (e.target.tagName === 'SELECT' && multiple) {
      const seleccionados = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setValores({ ...valores, [name]: seleccionados });
    } else if (type === 'checkbox') {
      setValores({ ...valores, [name]: checked });
    } else {
      const valorProcesado = (name === 'id_usuario' || name.startsWith('id_')) 
        ? parseInt(value) 
        : value;
      setValores({ ...valores, [name]: valorProcesado });
    }
  };

  // ✅ Validaciones personalizadas
  const validarCampos = () => {
    const nuevosErrores = {};
    for (const campo of campos) {
      const valor = valores[campo.nombre];

      // 1. Validación requerida
      if (campo.requerido && (valor === '' || valor === undefined || valor === null)) {
        nuevosErrores[campo.nombre] = 'Este campo es obligatorio';
        continue;
      }

      // 2. Validaciones personalizadas por campo
      if (validacionesPersonalizadas[campo.nombre]) {
        const mensajeError = validacionesPersonalizadas[campo.nombre](valor, valores);
        if (mensajeError) {
          nuevosErrores[campo.nombre] = mensajeError;
        }
      }
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      onSubmit(valores);
    }
  };

  const campoImagen = campos.find(c => c.tipo === 'file');
  const camposRestantes = campos.filter(c => c.tipo !== 'file');

  return (
    <form className="formulario-grid" onSubmit={manejarSubmit}>
      {/* Columna izquierda: imagen */}
      {campoImagen && (
        <div className="columna izquierda">
          <div className="grupo-campo">
            <label className="etiqueta-campo">{campoImagen.etiqueta}:</label>
            <input
              className="input-estilo"
              type="file"
              name={campoImagen.nombre}
              onChange={manejarCambio}
              required={campoImagen.requerido}
              accept="image/*"
            />
            {(previewImagen[campoImagen.nombre] || campoImagen.vistaPrevia) && (
              <div className="preview-imagen">
                <img
                  src={previewImagen[campoImagen.nombre] || campoImagen.vistaPrevia}
                  alt="Vista previa"
                  className="imagen-preview"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Columna derecha: campos restantes */}
      <div className="columna derecha">
        {camposRestantes.map((campo, index) => (
          <div className="grupo-campo" key={index}>
            <label className="etiqueta-campo">{campo.etiqueta}:</label>

            {/* Textarea */}
            {campo.tipo === 'textarea' && (
              <textarea
                className="input-estilo"
                name={campo.nombre}
                rows="4"
                placeholder={campo.placeholder}
                required={campo.requerido}
                value={valores[campo.nombre] || ''}
                onChange={manejarCambio}
              />
            )}

            {/* Select */}
            {campo.tipo === 'select' && (
              <select
                className="input-estilo"
                name={campo.nombre}
                required={campo.requerido}
                value={campo.multiple ? valores[campo.nombre] || [] : valores[campo.nombre] || ''}
                onChange={manejarCambio}
                multiple={campo.multiple}
              >
                {!campo.multiple && <option value="">-- Seleccione --</option>}
                {campo.opciones?.map((opcion, i) => (
                  <option key={i} value={opcion.valor}>
                    {opcion.etiqueta}
                  </option>
                ))}
              </select>
            )}

            {/* Radio */}
            {campo.tipo === 'radio' && campo.opciones.map((opcion, i) => (
              <label key={i} className="opcion-radio">
                <input
                  type="radio"
                  name={campo.nombre}
                  value={opcion.valor}
                  checked={valores[campo.nombre] === opcion.valor}
                  required={campo.requerido}
                  onChange={manejarCambio}
                />
                {opcion.etiqueta}
              </label>
            ))}

            {/* Checkbox */}
            {campo.tipo === 'checkbox' && (
              <input
                className="input-checkbox"
                type="checkbox"
                name={campo.nombre}
                checked={valores[campo.nombre] || false}
                onChange={manejarCambio}
              />
            )}

            {/* Inputs comunes */}
            {['text', 'number', 'email', 'date', 'datetime-local'].includes(campo.tipo) && (
              <input
                className="input-estilo"
                type={campo.tipo}
                name={campo.nombre}
                placeholder={campo.placeholder}
                required={campo.requerido}
                value={valores[campo.nombre] || ''}
                onChange={manejarCambio}
              />
            )}

            {/* Mostrar error si existe */}
            {errores[campo.nombre] && (
              <p className="mensaje-error">{errores[campo.nombre]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Botones */}
      {botonesPersonalizados.length > 0 && (
        <div className="formulario-botones">
          {botonesPersonalizados.map((btn, i) => (
            <button
              key={i}
              type={btn.tipo || 'button'}
              className={`btn-formulario ${btn.clase || ''}`}
              onClick={btn.onClick}
            >
              {btn.texto}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default FormularioAdmin;
