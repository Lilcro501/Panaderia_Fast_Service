
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

// Componentes
import PrivateRoute from "../components/PrivateRoute";
import RutasLayout from '../components/RutasLayouts';

// ------------------- Páginas Clientes -------------------
import Home from '../pages/PagesClientes/Home';
import ActualizarPerfil from '../pages/PagesClientes/ActualizarPerfil';
import CalificarExperiencia from '../pages/PagesClientes/CalificarExperiencia';
import CategoriasBebidas from '../pages/PagesClientes/CategoriasBebidas';
import CategoriasFritos from "../pages/PagesClientes/CategoriasFritos";
import CategoriasHelados from "../pages/PagesClientes/CategoriasHelados";
import CategoriasMecato from "../pages/PagesClientes/CategoriasMecato";
import CategoriasPanes from '../pages/PagesClientes/CategoriaPanes';
import Favoritos from "../pages/PagesClientes/Favoritos";
import InfoLegal from '../pages/PagesClientes/InfoLegal';
import ManifiestoConsumidor from '../pages/PagesClientes/ManifiestoConsumidor';
import PerfilUsuario from '../pages/PagesClientes/PerfilUsuario';
import PoliticaCo from "../pages/PagesClientes/PoliticaCo";
import PoliticaPrivacidad from "../pages/PagesClientes/PoliticaPrivacidad";
import Recomendacion from '../pages/PagesClientes/Recomendacion';
import TYC from "../pages/PagesClientes/TYC";
import EntregaDomicilio from '../pages/PagesClientes/EntregaDomicilio';
import EntregaLocal from '../pages/PagesClientes/PagoLocal';
import FacturaProductos from '../pages/PagesClientes/FacturaProductos';
import ProductoDetalle from '../components/ProductoDetalle';

// ------------------- Páginas Cliente No Login -------------------
import AccedeAqui from '../pages/PagesClienteNologin/AccedeAqui';
import HomeSinRegistrar from '../pages/PagesClienteNologin/HomeSinRegistrar';
import Conocenos from '../components/Conocenos';
import Login from '../pages/PagesLogin/Login';


// ------------------- Páginas Login -------------------
import CambioDeContraseña from "../pages/PagesLogin/CambioContraseña";
import IngresarCodigo from '../pages/PagesLogin/IngresarCodigo';
import OlvidoContraseña from "../pages/PagesLogin/OlvidoContraseña";
import Registro from '../pages/PagesLogin/Registro';

// ------------------- Páginas Administrador -------------------
import AdministrarInven from '../pages/PagesAdmin/AdministrarInven';
import AgregarInven from '../pages/PagesAdmin/AgregarInven';
import EditarInven from '../pages/PagesAdmin/EditarInven';
import EliminarInven from '../pages/PagesAdmin/EliminarInven';
import Catalogo_Admin from '../pages/PagesAdmin/Catalogo_Admin';
import AdministrarTrabajadores from '../pages/PagesAdmin/AdministrarTrabajadores';
import AgregarTrabajador from '../pages/PagesAdmin/AgregarTrabajador';
import EditarTrabajador from '../pages/PagesAdmin/EditarTrabajador';
import EliminarTrabajador from '../pages/PagesAdmin/EliminarTrabajador';
import Cronograma from '../pages/PagesAdmin/Cronograma';
import AgregarCrono from '../pages/PagesAdmin/AgregarCrono';
import EditarCrono from '../pages/PagesAdmin/EditarCrono';
import HistorialPedido from '../pages/PagesAdmin/HistorialPedido';

// ------------------- Páginas Trabajador -------------------
import DetallesPedido from '../pages/PagesTrabajador/DetallesPedido';
import Formulario from '../pages/PagesTrabajador/Formulario';
import EstadosPedidos from '../pages/PagesTrabajador/EstadosPedidos';
import HistorialPedidos from '../pages/PagesTrabajador/HistorialPedidos';
import InfoCliente from '../pages/PagesTrabajador/InfoCliente';
import Inicio from '../pages/PagesTrabajador/Inicio';
import ListaPedidos from '../pages/PagesTrabajador/ListaPedidos';
import EditarPerfil from '../pages/PagesTrabajador/EditarPerfil';

const AppRouter = () => {
  return (
    <Routes>
      {/* Cliente */}

      <Route path='/home' element={<PrivateRoute role="cliente"><MainLayout><Home /></MainLayout></PrivateRoute>} />
      <Route path='/Perfil/usuario' element={<PrivateRoute role="cliente"><MainLayout><PerfilUsuario /></MainLayout></PrivateRoute>} />
      <Route path='/Actualizar' element={<PrivateRoute role="cliente"><MainLayout><ActualizarPerfil /></MainLayout></PrivateRoute>} />
      <Route path='/CalificarExperiencia' element={<PrivateRoute role="cliente"><MainLayout><CalificarExperiencia /></MainLayout></PrivateRoute>} />
      <Route path='/recomendacion' element={<PrivateRoute role="cliente"><MainLayout><Recomendacion /></MainLayout></PrivateRoute>} />
      <Route path='/Favoritos' element={<PrivateRoute role="cliente"><MainLayout><Favoritos /></MainLayout></PrivateRoute>} />
      <Route path='/FacturaProductos' element={<PrivateRoute role="cliente"><MainLayout><FacturaProductos /></MainLayout></PrivateRoute>} />
      <Route path='/EntregaDomicilio' element={<PrivateRoute role="cliente"><MainLayout><EntregaDomicilio /></MainLayout></PrivateRoute>} />
      <Route path='/EntregaLocal' element={<PrivateRoute role="cliente"><MainLayout><EntregaLocal /></MainLayout></PrivateRoute>} />


      {/* Layout dinámico - Rutas compartidas */}
      <Route path="/conocenos" element={<RutasLayout><Conocenos /></RutasLayout>} />
      <Route path="/InfoLegal" element={<RutasLayout><InfoLegal /></RutasLayout>} />
      <Route path="/ManifiestoConsumidor" element={<RutasLayout><ManifiestoConsumidor /></RutasLayout>} />
      <Route path='/TYC' element={<RutasLayout><TYC /></RutasLayout>} />
      <Route path='/PoliticaPrivacidad' element={<RutasLayout><PoliticaPrivacidad /></RutasLayout>} />
      <Route path='/Politica' element={<RutasLayout><PoliticaCo /></RutasLayout>} />
      <Route path='/categorias/CategoriaPanes' element={<RutasLayout><CategoriasPanes /></RutasLayout>} />
      <Route path='/categorias/CategoriasFritos' element={<RutasLayout><CategoriasFritos /></RutasLayout>} />
      <Route path='/categorias/CategoriasHelados' element={<RutasLayout><CategoriasHelados /></RutasLayout>} />
      <Route path='/categorias/CategoriasMecato' element={<RutasLayout><CategoriasMecato /></RutasLayout>} />
      <Route path='/categorias/CategoriasBebidas' element={<RutasLayout><CategoriasBebidas /></RutasLayout>} />
      <Route path='/producto/:id' element={<RutasLayout><ProductoDetalle></ProductoDetalle></RutasLayout>} />


      {/* Cliente No Login */}
      <Route path='/' element={<MainLayoutSinLogin><HomeSinRegistrar /></MainLayoutSinLogin>} />
      <Route path='/CambioContraseña' element={<MainLayoutSinLogin><CambioDeContraseña /></MainLayoutSinLogin>} />
      <Route path='/OlvidoContraseña' element={<MainLayoutSinLogin><OlvidoContraseña /></MainLayoutSinLogin>} />
      <Route path='/IngresarCodigo' element={<MainLayoutSinLogin><IngresarCodigo /></MainLayoutSinLogin>} />
      <Route path='/Registro' element={<MainLayoutSinLogin><Registro /></MainLayoutSinLogin>} />
      <Route path='/AccedeAqui' element={<MainLayoutSinLogin><AccedeAqui /></MainLayoutSinLogin>} />
      <Route path="/Login" element={<Login />} />


      {/* Trabajador */}
      <Route path='/Formulario' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><Formulario /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/EstadosPedidos' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><EstadosPedidos /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/HistorialPedidos' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><HistorialPedidos /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/InfoCliente/:id' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><InfoCliente /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/Inicio' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><Inicio /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/ListaPedidos' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><ListaPedidos /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/DetallesPedido/:id' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><DetallesPedido /></LayoutTrabajador></PrivateRoute>} />
      <Route path='/EditarPerfil' element={<PrivateRoute role="Trabajador"><LayoutTrabajador><EditarPerfil /></LayoutTrabajador></PrivateRoute>} />

      {/* Admin */}
      <Route path='/AgregarTrabajador' element={<PrivateRoute role="Admin"><AdminLayout><AgregarTrabajador /></AdminLayout></PrivateRoute>} />
      <Route path='/EditarTrabajador' element={<PrivateRoute role="Admin"><AdminLayout><EditarTrabajador /></AdminLayout></PrivateRoute>} />
      <Route path='/EliminarTrabajador' element={<PrivateRoute role="Admin"><AdminLayout><EliminarTrabajador /></AdminLayout></PrivateRoute>} />
      <Route path='/Cronograma' element={<PrivateRoute role="Admin"><AdminLayout><Cronograma /></AdminLayout></PrivateRoute>} />
      <Route path='/AgregarCrono' element={<PrivateRoute role="Admin"><AdminLayout><AgregarCrono /></AdminLayout></PrivateRoute>} />
      <Route path='/EditarCrono' element={<PrivateRoute role="Admin"><AdminLayout><EditarCrono /></AdminLayout></PrivateRoute>} />
      <Route path='/HistorialPedido' element={<PrivateRoute role="Admin"><AdminLayout><HistorialPedido /></AdminLayout></PrivateRoute>} />
      <Route path='/CatalogoAdmin' element={<PrivateRoute role="Admin"><AdminLayout><Catalogo_Admin /></AdminLayout></PrivateRoute>} />
      <Route path='/AdministrarInven' element={<PrivateRoute role="Admin"><AdminLayout><AdministrarInven /></AdminLayout></PrivateRoute>} />
      <Route path='/AgregarInven' element={<PrivateRoute role="Admin"><AdminLayout><AgregarInven /></AdminLayout></PrivateRoute>} />
      <Route path='/EditarInven' element={<PrivateRoute role="Admin"><AdminLayout><EditarInven /></AdminLayout></PrivateRoute>} />
      <Route path='/EliminarInven' element={<PrivateRoute role="Admin"><AdminLayout><EliminarInven /></AdminLayout></PrivateRoute>} />
      <Route path='/AdministrarTrabajadores' element={<PrivateRoute role="Admin"><AdminLayout><AdministrarTrabajadores /></AdminLayout></PrivateRoute>} />
    </Routes>
  );
};

export default AppRouter;
