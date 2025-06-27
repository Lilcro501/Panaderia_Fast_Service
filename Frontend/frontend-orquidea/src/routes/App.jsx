// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/PagesClientes/Home';

import CategoriasPanes from '../pages/PagesClientes/CategoriaPanes';
import CategoriasFritos from "../pages/PagesClientes/CategoriasFritos"
import CategoriasMecato from "../pages/PagesClientes/CategoriasMecato"
import CategoriasHelados from "../pages/PagesClientes/CategoriasHelados"
import CategoriasBebidas from '../pages/PagesClientes/CategoriasBebidas';
import PerfilUsuario from '../pages/PagesClientes/PerfilUsuario';
import ActualizarPerfil from "../pages/PagesClientes/ActualizarPerfil"
import CalificarExperiencia from '../pages/PagesClientes/CalificarExperiencia';
import Recomendacion from '../pages/PagesClientes/Recomendacion';
import Conocenos from '../pages/PagesClientes/Conocenos';
import AccedeAqui from '../pages/PagesClienteNologin/AccedeAqui'
import Favoritos from "../pages/PagesClientes/Favoritos"
import HomeSinRegistrar from '../pages/PagesClienteNologin/HomeSinRegistrar';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import CambioDeContraseña from "../pages/PagesLogin/CambioContraseña"
import OlvidoContraseña from "../pages/PagesLogin/OlvidoContraseña"
import IngresarCodigo from '../pages/PagesLogin/IngresarCodigo';
import Registro from '../pages/PagesLogin/Registro';
import ManifiestoConsumidor from '../pages/PagesClientes/ManifiestoConsumidor';
import InfoLegal from '../pages/PagesClientes/InfoLegal';
import TYC from "../pages/PagesClientes/TYC"
import PoliticaPrivacidad from "../pages/PagesClientes/PoliticaPrivacidad"
import PoliticaCookies from "../pages/PagesClientes/PoliticaCookies"
import Experiencia from "../pages/PagesClientes/Experiencia";
  const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            } 
          />7
          <Route 
            path="categorias/CategoriaPanes"
            element={
              <MainLayout>
                <CategoriasPanes />
              </MainLayout>
            } 
          />
          <Route 
            path="categorias/CategoriasFritos"
            element={
              <MainLayout>
                <CategoriasFritos />
              </MainLayout>
            } 
          />

          <Route 
            path="categorias/CategoriasHelados"
            element={
              <MainLayout>
                <CategoriasHelados />
              </MainLayout>
            } 
          />
          <Route 
            path="categorias/CategoriasMecato"
            element={
              <MainLayout>
                <CategoriasMecato />
              </MainLayout>
            } 
          />

          <Route 
            path="categorias/CategoriasBebidas"
            element={
              <MainLayout>
                <CategoriasBebidas />
              </MainLayout>
            } 
          />

          <Route 
            path="Perfil/usuario"
            element={
              <MainLayout>
                <PerfilUsuario />
              </MainLayout>
            } 
          />
          <Route 
            path="Actualizar"
            element={
              <MainLayout>
                <ActualizarPerfil></ActualizarPerfil>
              </MainLayout>
            } 
          />

          <Route 
            path="CalificarExperiencia"
            element={
              <MainLayout>
                <CalificarExperiencia></CalificarExperiencia>
              </MainLayout>
            } 
          />
          <Route 
            path="recomendacion"
            element={
              <MainLayout>
                <Recomendacion></Recomendacion>
              </MainLayout>
            }
          />

          <Route 
            path="/conocenos"
            element={
              <MainLayout>
                <Conocenos />
              </MainLayout>
            } 
          />
          
          <Route
          path='/AccedeAqui'
          element={
            <MainLayout>
              <AccedeAqui />
            </MainLayout>
          }
          />
      
          <Route
          path='/Favoritos'
          element={
            <MainLayout>
              <Favoritos></Favoritos>
            </MainLayout>
          }
          />
          
          <Route
          path='/HomeSinRegistrar'
          element={
            <MainLayoutSinLogin>
              <HomeSinRegistrar></HomeSinRegistrar>
            </MainLayoutSinLogin>
          }
          />

          <Route
          path='/CambioDeContraseña'
          element={
            <CambioDeContraseña></CambioDeContraseña>
          }
          />

          <Route
          path='/OlvidoContraseña'
          element={
            <MainLayoutSinLogin>
              <OlvidoContraseña></OlvidoContraseña>
            </MainLayoutSinLogin>
          }
          />
          <Route
          path='/IngresarCodigo'
          element={
            <MainLayoutSinLogin>
              <IngresarCodigo></IngresarCodigo>
            </MainLayoutSinLogin>
          }
          />

          <Route
          path='/Registro'
          element={
            <MainLayoutSinLogin>
              <Registro></Registro>
            </MainLayoutSinLogin>
          }
          />


          <Route
          path='/ManifiestoDelConsumidor'
          element={
            <MainLayout>
              <ManifiestoConsumidor>
              </ManifiestoConsumidor>
            </MainLayout>
            
          }
          />

           <Route
          path='/InfoLegal'
          element={
            <MainLayout>
             <InfoLegal></InfoLegal>
            </MainLayout>
            
          }
          />

        <Route
          path='/TYC'
          element={
            <MainLayout>
            <TYC></TYC>
            </MainLayout>
            
          }
          />

          <Route
          path='/PoliticaPrivacidad'
          element={
            <MainLayout>
              <PoliticaPrivacidad></PoliticaPrivacidad>
            </MainLayout>
            
          }
          />

          <Route
          path='/PoliticaCookies'
          element={
            <MainLayout>
            <PoliticaCookies></PoliticaCookies>
            </MainLayout>
            
          }
          />
          <Route
          path='/Experiencia'
          element={
            <MainLayout>
            <Experiencia></Experiencia>
            </MainLayout>
          }
          />
        </Routes>
      </Router>
      
    );
  };

export default AppRouter;

