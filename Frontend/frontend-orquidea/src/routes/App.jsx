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
import EntregaDomicilio from '../pages/PagesClientes/EntregaDomicilio';
import EntregaLocal from '../pages/PagesClientes/PagoLocal';
import FacturaProductos from '../pages/PagesClientes/FacturaProductos';

// ------------------- Páginas Cliente No Login -------------------
import AccedeAqui from '../pages/PagesClienteNologin/AccedeAqui';
import HomeSinRegistrar from '../pages/PagesClienteNologin/HomeSinRegistrar';

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

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Cliente */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="categorias/CategoriaPanes" element={<MainLayout><CategoriasPanes /></MainLayout>} />
        <Route path="categorias/CategoriasFritos" element={<MainLayout><CategoriasFritos /></MainLayout>} />
        <Route path="categorias/CategoriasHelados" element={<MainLayout><CategoriasHelados /></MainLayout>} />
        <Route path="categorias/CategoriasMecato" element={<MainLayout><CategoriasMecato /></MainLayout>} />
        <Route path="categorias/CategoriasBebidas" element={<MainLayout><CategoriasBebidas /></MainLayout>} />
        <Route path="Perfil/usuario" element={<MainLayout><PerfilUsuario /></MainLayout>} />
        <Route path="Actualizar" element={<MainLayout><ActualizarPerfil /></MainLayout>} />
        <Route path="CalificarExperiencia" element={<MainLayout><CalificarExperiencia /></MainLayout>} />
        <Route path="recomendacion" element={<MainLayout><Recomendacion /></MainLayout>} />
        <Route path="/conocenos" element={<MainLayout><Conocenos /></MainLayout>} />
        <Route path='/AccedeAqui' element={<MainLayout><AccedeAqui /></MainLayout>} />
        <Route path='/Favoritos' element={<MainLayout><Favoritos /></MainLayout>} />
        <Route path='/FacturaProductos' element={<MainLayout><FacturaProductos /></MainLayout>} />
        <Route path='/EntregaDomicilio' element={<MainLayout><EntregaDomicilio /></MainLayout>} />
        <Route path='/EntregaLocal' element={<MainLayout><EntregaLocal /></MainLayout>} />
        <Route path='/ManifiestoDelConsumidor' element={<MainLayout><ManifiestoConsumidor /></MainLayout>} />
        <Route path='/InfoLegal' element={<MainLayout><InfoLegal /></MainLayout>} />
        <Route path='/TYC' element={<MainLayout><TYC /></MainLayout>} />
        <Route path='/PoliticaPrivacidad' element={<MainLayout><PoliticaPrivacidad /></MainLayout>} />
        <Route path='/Politica' element={<MainLayout><PoliticaCo /></MainLayout>} />

        {/* Cliente No Login */}
        <Route path='/HomeSinRegistrar' element={<MainLayoutSinLogin><HomeSinRegistrar /></MainLayoutSinLogin>} />
        <Route path='/CambioDeContraseña' element={<CambioDeContraseña />} />
        <Route path='/OlvidoContraseña' element={<MainLayoutSinLogin><OlvidoContraseña /></MainLayoutSinLogin>} />
        <Route path='/IngresarCodigo' element={<MainLayoutSinLogin><IngresarCodigo /></MainLayoutSinLogin>} />
        <Route path='/Registro' element={<MainLayoutSinLogin><Registro /></MainLayoutSinLogin>} />

        {/* Trabajador */}
        <Route path='DetallesPedido' element={<MainLayout><DetallesPedido /></MainLayout>} />
        <Route path='/Formulario' element={<MainLayout><Formulario /></MainLayout>} />
        <Route path='/EstadosPedidos' element={<MainLayout><EstadosPedidos /></MainLayout>} />
        <Route path='/HistorialPedidos' element={<MainLayout><HistorialPedidos /></MainLayout>} />
        <Route path='/InfoCliente' element={<MainLayout><InfoCliente /></MainLayout>} />
        <Route path='/Inicio' element={<MainLayout><Inicio /></MainLayout>} />
        <Route path='/ListaPedidos' element={<MainLayout><ListaPedidos /></MainLayout>} />

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
