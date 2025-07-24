import React, { useState, useEffect } from 'react';
import '../assets/styles/FormularioAdmin.css';

const FormularioAdmin = ({ campos, onSubmit, botonesPersonalizados = [], valoresIniciales = {} }) => {
  const [valores, setValores] = useState({});
  const [previewImagen, setPreviewImagen] = useState({});

  // Cargar valores iniciales al montar o cambiar valoresIniciales
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
      const valorProcesado = (name === 'id_usuario' || name.startsWith('id_')) ? parseInt(value) : value;
      setValores({ ...valores, [name]: valorProcesado });
    }
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onSubmit(valores);
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
            {previewImagen[campoImagen.nombre] && (
              <div className="preview-imagen">
                <img
                  src={previewImagen[campoImagen.nombre]}
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

            {/* Área de texto */}
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

            {/* Campo SELECT modificado aquí 👇 */}
            {campo.tipo === 'select' && (
              <select
                className="input-estilo"
                name={campo.nombre}
                required={campo.requerido}
                value={campo.multiple ? valores[campo.nombre] || [] : valores[campo.nombre] || ''}
                onChange={manejarCambio}
                multiple={campo.multiple}
              >
                {!campo.multiple && (
                  <option value="">
                    -- Seleccione --
                  </option>
                )}

                {/* ✅ CAMBIO IMPORTANTE: se usa 'opcion.etiqueta' en vez de 'label' */}
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
          </div>
        ))}
      </div>

      {/* Botones personalizados */}
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
