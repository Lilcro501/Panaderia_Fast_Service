
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

// Componentes
import RutaProtegida from '../components/RutaProtegida';
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

// ------------------- Páginas Cliente No Login -------------------
import AccedeAqui from '../pages/PagesClienteNologin/AccedeAqui';
import InfoPorProducto from '../pages/PagesClienteNologin/InfoPorProducto';
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
      <Route path='/Home' element={<RutaProtegida role="Cliente"><MainLayout><Home /></MainLayout></RutaProtegida>} />
      <Route path='/Perfil/usuario' element={<RutaProtegida role="Cliente"><MainLayout><PerfilUsuario /></MainLayout></RutaProtegida>} />
      <Route path='/Actualizar' element={<RutaProtegida role="Cliente"><MainLayout><ActualizarPerfil /></MainLayout></RutaProtegida>} />
      <Route path='/CalificarExperiencia' element={<RutaProtegida role="Cliente"><MainLayout><CalificarExperiencia /></MainLayout></RutaProtegida>} />
      <Route path='/recomendacion' element={<RutaProtegida role="Cliente"><MainLayout><Recomendacion /></MainLayout></RutaProtegida>} />
      <Route path='/Favoritos' element={<RutaProtegida role="Cliente"><MainLayout><Favoritos /></MainLayout></RutaProtegida>} />
      <Route path='/FacturaProductos' element={<RutaProtegida role="Cliente"><MainLayout><FacturaProductos /></MainLayout></RutaProtegida>} />
      <Route path='/EntregaDomicilio' element={<RutaProtegida role="Cliente"><MainLayout><EntregaDomicilio /></MainLayout></RutaProtegida>} />
      <Route path='/EntregaLocal' element={<RutaProtegida role="Cliente"><MainLayout><EntregaLocal /></MainLayout></RutaProtegida>} />

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
      <Route path='/producto/:id' element={<RutasLayout><InfoPorProducto /></RutasLayout>} />

      {/* Cliente No Login */}
      <Route path='/' element={<MainLayoutSinLogin><HomeSinRegistrar /></MainLayoutSinLogin>} />
      <Route path='/CambioContraseña' element={<MainLayoutSinLogin><CambioDeContraseña /></MainLayoutSinLogin>} />
      <Route path='/OlvidoContraseña' element={<MainLayoutSinLogin><OlvidoContraseña /></MainLayoutSinLogin>} />
      <Route path='/IngresarCodigo' element={<MainLayoutSinLogin><IngresarCodigo /></MainLayoutSinLogin>} />
      <Route path='/Registro' element={<MainLayoutSinLogin><Registro /></MainLayoutSinLogin>} />
      <Route path='/AccedeAqui' element={<MainLayoutSinLogin><AccedeAqui /></MainLayoutSinLogin>} />
      <Route path="/Login" element={<Login />} />


      {/* Trabajador */}
      <Route path='/Formulario' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><Formulario /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/EstadosPedidos' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><EstadosPedidos /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/HistorialPedidos' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><HistorialPedidos /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/InfoCliente/:id' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><InfoCliente /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/Inicio' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><Inicio /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/ListaPedidos' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><ListaPedidos /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/DetallesPedido/:id' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><DetallesPedido /></LayoutTrabajador></RutaProtegida>} />
      <Route path='/EditarPerfil' element={<RutaProtegida role="Trabajador"><LayoutTrabajador><EditarPerfil /></LayoutTrabajador></RutaProtegida>} />

      {/* Admin */}
      <Route path='/AgregarTrabajador' element={<RutaProtegida role="Admin"><AdminLayout><AgregarTrabajador /></AdminLayout></RutaProtegida>} />
      <Route path='/EditarTrabajador' element={<RutaProtegida role="Admin"><AdminLayout><EditarTrabajador /></AdminLayout></RutaProtegida>} />
      <Route path='/EliminarTrabajador' element={<RutaProtegida role="Admin"><AdminLayout><EliminarTrabajador /></AdminLayout></RutaProtegida>} />
      <Route path='/Cronograma' element={<RutaProtegida role="Admin"><AdminLayout><Cronograma /></AdminLayout></RutaProtegida>} />
      <Route path='/AgregarCrono' element={<RutaProtegida role="Admin"><AdminLayout><AgregarCrono /></AdminLayout></RutaProtegida>} />
      <Route path='/EditarCrono' element={<RutaProtegida role="Admin"><AdminLayout><EditarCrono /></AdminLayout></RutaProtegida>} />
      <Route path='/HistorialPedido' element={<RutaProtegida role="Admin"><AdminLayout><HistorialPedido /></AdminLayout></RutaProtegida>} />
      <Route path='/CatalogoAdmin' element={<RutaProtegida role="Admin"><AdminLayout><Catalogo_Admin /></AdminLayout></RutaProtegida>} />
      <Route path='/AdministrarInven' element={<RutaProtegida role="Admin"><AdminLayout><AdministrarInven /></AdminLayout></RutaProtegida>} />
      <Route path='/AgregarInven' element={<RutaProtegida role="Admin"><AdminLayout><AgregarInven /></AdminLayout></RutaProtegida>} />
      <Route path='/EditarInven' element={<RutaProtegida role="Admin"><AdminLayout><EditarInven /></AdminLayout></RutaProtegida>} />
      <Route path='/EliminarInven' element={<RutaProtegida role="Admin"><AdminLayout><EliminarInven /></AdminLayout></RutaProtegida>} />
      <Route path='/AdministrarTrabajadores' element={<RutaProtegida role="Admin"><AdminLayout><AdministrarTrabajadores /></AdminLayout></RutaProtegida>} />
    </Routes>
  );
};

export default AppRouter;
