import React, { useState } from 'react';
import '../assets/styles/FormularioAdmin.css'; 

/* 
 * Componente reutilizable de formulario
 * @param {Array} campos - Campos a renderizar
 * @param {Function} onSubmit - Función que se ejecuta al enviar el formulario
 * @param {Array} botonesPersonalizados - Botones opcionales (texto, tipo, clase, onClick)
*/
const FormularioAdmin = ({ campos, onSubmit, botonesPersonalizados = [] }) => {
  const [valores, setValores] = useState({});
  const [previewImagen, setPreviewImagen] = useState({});

  // Manejar cambios en los inputs del formulario
  const manejarCambio = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === 'file') {
      const archivo = files[0];
      setValores({ ...valores, [name]: archivo });

      // Genera vista previa si es una imagen
      if (archivo && archivo.type.startsWith('image/')) {
        const urlTemp = URL.createObjectURL(archivo);
        setPreviewImagen({ ...previewImagen, [name]: urlTemp });
      }
    } else if (type === 'checkbox') {
      setValores({ ...valores, [name]: checked });
    } else {
      setValores({ ...valores, [name]: value });
    }
  };

  // Maneja el envío del formulario
  const manejarSubmit = (e) => {
    e.preventDefault();
    onSubmit(valores);
  };

  // Separa los campos tipo imagen del resto
  const campoImagen = campos.find(c => c.tipo === 'file');
  const camposRestantes = campos.filter(c => c.tipo !== 'file');

  return (
    <form className="formulario-grid" onSubmit={manejarSubmit}>
      
      {/*  campo imagen */}
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

            {campo.tipo === 'textarea' && (
              <textarea
                className="input-estilo"
                name={campo.nombre}
                rows="4"
                placeholder={campo.placeholder}
                required={campo.requerido}
                onChange={manejarCambio}
              />
            )}

            {campo.tipo === 'select' && (
              <select
                className="input-estilo"
                name={campo.nombre}
                required={campo.requerido}
                onChange={manejarCambio}
              >
                <option value="">-- Seleccione --</option>
                {campo.opciones.map((opcion, i) => (
                  <option key={i} value={opcion.valor}>{opcion.label}</option>
                ))}
              </select>
            )}

            {campo.tipo === 'radio' && campo.opciones.map((opcion, i) => (
              <label key={i} className="opcion-radio">
                <input
                  type="radio"
                  name={campo.nombre}
                  value={opcion.valor}
                  required={campo.requerido}
                  onChange={manejarCambio}
                />
                {opcion.label}
              </label>
            ))}

            {campo.tipo === 'checkbox' && (
              <input
                className="input-checkbox"
                type="checkbox"
                name={campo.nombre}
                onChange={manejarCambio}
              />
            )}

            {['text', 'number', 'email', 'date'].includes(campo.tipo) && (
              <input
                className="input-estilo"
                type={campo.tipo}
                name={campo.nombre}
                placeholder={campo.placeholder}
                required={campo.requerido}
                onChange={manejarCambio}
              />
            )}
          </div>
        ))}
      </div>

      {/* Botones personalizados desde el padre */}
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
