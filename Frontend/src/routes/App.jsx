
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';

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

// ------------------- Páginas Login -------------------
import CambioDeContraseña from "../pages/PagesLogin/CambioContraseña";
import IngresarCodigo from '../pages/PagesLogin/IngresarCodigo';
import OlvidoContraseña from "../pages/PagesLogin/OlvidoContraseña";
import Registro from '../pages/PagesLogin/Registro';
import Login from '../pages/PagesLogin/Login';

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
import { IoMdPaper } from 'react-icons/io';


// ------------------- Variaciones -------------------
import RutasLayout from '../components/RutasLayouts';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Cliente */}
        <Route rol='Cliente' path='/Home' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/Perfil/usuario' element={<MainLayout><PerfilUsuario /></MainLayout>} />
        <Route path='/Actualizar' element={<MainLayout><ActualizarPerfil /></MainLayout>} />
        <Route path='/CalificarExperiencia' element={<MainLayout><CalificarExperiencia /></MainLayout>} />
        <Route path='/recomendacion' element={<MainLayout><Recomendacion /></MainLayout>} />
        <Route path='/Favoritos' element={<MainLayout><Favoritos /></MainLayout>} />
        <Route path='/FacturaProductos' element={<MainLayout><FacturaProductos /></MainLayout>} />
        <Route path='/EntregaDomicilio' element={<MainLayout><EntregaDomicilio /></MainLayout>} />
        <Route path='/EntregaLocal' element={<MainLayout><EntregaLocal /></MainLayout>} />


        {/* Layout dinámico - Rutas compartidas que deben cambiar layout según el rol */}
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
        <Route path='/Login' element={<MainLayoutSinLogin><Login /></MainLayoutSinLogin>} />
        <Route path='/AccedeAqui' element={<MainLayoutSinLogin><AccedeAqui /></MainLayoutSinLogin>} />
        
        {/* Trabajador */}
        <Route path='/Formulario' element={<LayoutTrabajador><Formulario /></LayoutTrabajador>} />
        <Route path='/EstadosPedidos' element={<LayoutTrabajador><EstadosPedidos /></LayoutTrabajador>} />
        <Route path='/HistorialPedidos' element={<LayoutTrabajador><HistorialPedidos /></LayoutTrabajador>} />
        <Route path='/InfoCliente/:id' element={<LayoutTrabajador><InfoCliente /></LayoutTrabajador>} />
        <Route path='/Inicio' element={<LayoutTrabajador><Inicio /></LayoutTrabajador>} />
        <Route path='/ListaPedidos' element={<LayoutTrabajador><ListaPedidos /></LayoutTrabajador>} />
        <Route path='/DetallesPedido/:id' element={<LayoutTrabajador><DetallesPedido /></LayoutTrabajador>} />
        <Route path='/EditarPerfil' element={<LayoutTrabajador><EditarPerfil /></LayoutTrabajador>} />

        {/* Admin */}
        <Route path='/AgregarTrabajador' element={<AdminLayout><AgregarTrabajador /></AdminLayout>} />
        <Route path='/EditarTrabajador' element={<AdminLayout><EditarTrabajador /></AdminLayout>} />
        <Route path='/EliminarTrabajador' element={<AdminLayout><EliminarTrabajador /></AdminLayout>} />
        <Route path='/Cronograma' element={<AdminLayout><Cronograma /></AdminLayout>} />
        <Route path='/AgregarCrono' element={<AdminLayout><AgregarCrono /></AdminLayout>} />
        <Route path='/EditarCrono' element={<AdminLayout><EditarCrono /></AdminLayout>} />
        <Route path='/HistorialPedido' element={<AdminLayout><HistorialPedido /></AdminLayout>} />
        <Route path='/CatalogoAdmin' element={<AdminLayout><Catalogo_Admin /></AdminLayout>} />
        <Route path='/AdministrarInven' element={<AdminLayout><AdministrarInven /></AdminLayout>} />
        <Route path='/AgregarInven' element={<AdminLayout><AgregarInven /></AdminLayout>} />
        <Route path='/EditarInven' element={<AdminLayout><EditarInven /></AdminLayout>} />
        <Route path='/EliminarInven' element={<AdminLayout><EliminarInven /></AdminLayout>} />
        <Route path='/AdministrarTrabajadores' element={<AdminLayout><AdministrarTrabajadores /></AdminLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;