import "../assets/styles/Experiencia.css"
import CalificacionInformacion from "./CalificacionInformacion"
import { Link } from "react-router-dom"

export default function Experiencia(){
    return (
        <>
        <div className="recuadro-enviar">
            <div className="recuadro-pregunta">
                <div className="contenedor-recuadro-enviar">
                    <br />
                  <div className="recuadro-informacion-3">
                      <h4>Indica tu respuesta donde 0  significa que no lo recomendarías y 10 totalmente lo recomendarías</h4>
                  </div>
                    <br />
                    <br />
                        
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <p className="numero">1</p>
                        <p className="numero">2</p>
                        <p className="numero">3</p>
                        <p className="numero">4</p>
                        <p className="numero">5</p>
                        <p className="numero">6</p>
                        <p className="numero">7</p>
                        <p className="numero">8</p>
                        <p className="numero">9</p>
                        <p className="numero">10</p>
                        
                    </div>
                    <br />
                    <br />
                    <div className="pregunta-input">
                        <label htmlFor="porque" style={{color:"black",}}>¿Por que?</label>
                        <br />
                        <br />
                         <input className="input-defecto"type="text" />
                        <br />
                        <br />
                    </div>
                    <br />
                       <Link to="/" >
                       <button className="boton-enviar">Enviar</button>
                       </Link>
                    
                </div>   
            </div>
        </div>
        </>
    )
}
