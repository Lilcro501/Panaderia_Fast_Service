// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';

// ------------------- Páginas Clientes -------------------
import Home from '../pages/PagesClientes/Home';
import ActualizarPerfil from '../pages/PagesClientes/ActualizarPerfil';
import CalificarExperiencia from '../pages/PagesClientes/CalificarExperiencia';
import CategoriasBebidas from '../pages/PagesClientes/CategoriasBebidas';
import CategoriasFritos from "../pages/PagesClientes/CategoriasFritos";
import CategoriasHelados from "../pages/PagesClientes/CategoriasHelados";
import CategoriasMecato from "../pages/PagesClientes/CategoriasMecato";
import CategoriasPanes from '../pages/PagesClientes/CategoriaPanes';
import Conocenos from '../pages/PagesClientes/Conocenos';
import Favoritos from "../pages/PagesClientes/Favoritos";
import InfoLegal from '../pages/PagesClientes/InfoLegal';
import ManifiestoConsumidor from '../pages/PagesClientes/ManifiestoConsumidor';
import PerfilUsuario from '../pages/PagesClientes/PerfilUsuario';
import PoliticaCo from "../pages/PagesClientes/PoliticaCo";
import PoliticaPrivacidad from "../pages/PagesClientes/PoliticaPrivacidad";
import Recomendacion from '../pages/PagesClientes/Recomendacion';
import TYC from "../pages/PagesClientes/TYC";

// ------------------- Páginas Cliente No Login -------------------
import AccedeAqui from '../pages/PagesClienteNologin/AccedeAqui';
import HomeSinRegistrar from '../pages/PagesClienteNologin/HomeSinRegistrar';

// ------------------- Páginas Login -------------------
import CambioDeContraseña from "../pages/PagesLogin/CambioContraseña";
import IngresarCodigo from '../pages/PagesLogin/IngresarCodigo';
import OlvidoContraseña from "../pages/PagesLogin/OlvidoContraseña";
import Registro from '../pages/PagesLogin/Registro';
import FacturaProductos from '../pages/PagesClientes/FacturaProductos';

// ------------------- Páginas Administrador -------------------
import AdministrarInven from '../pages/PagesAdmin/AdministrarInven';
import AdministrarTrabajadores from '../pages/PagesAdmin/AdministrarTrabajadores';
import AgregarInven from '../pages/PagesAdmin/AgregarInven';
import Agregar_EditarCrono from '../pages/PagesAdmin/Agregar_EditarCrono';
import Agregar_EditarTrabajador from '../pages/PagesAdmin/Agregar_EditarTrabajador';
import Cronograma from '../pages/PagesAdmin/Cronograma';
import EditarInven from '../pages/PagesAdmin/EditarInven';
import EliminarInven from '../pages/PagesAdmin/EliminarInven';
import EliminarTrabajador from '../pages/PagesAdmin/EliminarTrabajador';
import HistorialPedido from '../pages/PagesAdmin/HistorialPedido';
import Catalogo_Admin from '../pages/PagesAdmin/Catalogo_Admin';





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
            <PoliticaCo></PoliticaCo>
            </MainLayout>

            
          }
          />

          <Route
          path='FacturaProductos'
          element={
            <MainLayout>
              <FacturaProductos></FacturaProductos>
            </MainLayout>
          }
          
          
          />

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Admin ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
          <Route
          path='/AdministrarInven'
          element={
            <AdminLayout>
              <AdministrarInven/>
            </AdminLayout>
          }
          />

          <Route
          path='/AgregarInven'
          element={
            <AdminLayout>
              <AgregarInven/>
            </AdminLayout>
          }
          />

          <Route
          path='/EditarInven'
          element={
            <AdminLayout>
              <EditarInven/>
            </AdminLayout>
          }
          />

          <Route
          path='/EliminarInven'
          element={
            <AdminLayout>
              <EliminarInven/>
            </AdminLayout>
          }
          />

          <Route
          path='/AdministrarTrabajadores'
          element={
            <AdminLayout>
              <AdministrarTrabajadores/>
            </AdminLayout>
          }
          />

          <Route
          path='/Agregar_EditarTrabajador'
          element={
            <AdminLayout>
              <Agregar_EditarTrabajador/>
            </AdminLayout>
          }
          />

          <Route
          path='/EliminarTrabajador'
          element={
            <AdminLayout>
              <EliminarTrabajador/>
            </AdminLayout>
          }
          />

          <Route
          path='/Cronograma'
          element={
            <AdminLayout>
              <Cronograma/>
            </AdminLayout>
          }
          />

          <Route
          path='/Agregar_EditarCronograma'
          element={
            <AdminLayout>
              <Agregar_EditarCrono/>
            </AdminLayout>
          }
          />

          <Route
          path='/HistorialPedido'
          element={
            <AdminLayout>
              <HistorialPedido/>
            </AdminLayout>
          }
          />

          <Route
          path='/CatalogoAdmin'
          element={
            <AdminLayout>
              <Catalogo_Admin/>
            </AdminLayout>
          }
          />


        </Routes>
      </Router>
      
    );
  };

export default AppRouter;

