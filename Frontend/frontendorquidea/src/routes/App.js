// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import CategoriasPanes from '../pages/CategoriaPanes';
import CategoriasFritos from "../pages/CategoriasFritos"
import CategoriasMecato from "../pages/CategoriasMecato"
import CategoriasHelados from "../pages/CategoriasHelados"
import CategoriasBebidas from '../pages/CategoriasBebidas';
import PerfilUsuario from '../pages/PerfilUsuario';
import ActualizarPerfil from "../pages/ActualizarPerfil"
import CalificarExperiencia from '../pages/CalificarExperiencia';
import Recomendacion from '../pages/Recomendacion';
import Conocenos from '../pages/Conocenos';
import AccedeAqui from '../pages/AccedeAqui';
import Favoritos from "../pages/Favoritos"

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
          />
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
        </Routes>
      </Router>
    );
  };

export default AppRouter;

