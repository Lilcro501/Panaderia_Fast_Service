
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');

// Layouts
import MainLayout from '../layouts/MainLayout';
import MainLayoutSinLogin from '../layouts/MainLayoutSinLogin';
import AdminLayout from '../layouts/AdminLayout';
import LayoutTrabajador from '../layouts/LayoutTrabajador';


// Componentes
import PrivateRoute from "../components/PrivateRoute";
import RutasLayouts from '../components/RutasLayouts';

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
import FacturaProductos from '../pages/PagesClientes/FacturaProductos';
import ProductoDetalle from '../components/ProductoDetalle';
import FormularioEntrega from '../pages/PagesClientes/FormularioEntrega';
import EncuestaCliente from '../pages/PagesClientes/EncuestaCliente';

  
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
import PrincipalAdmin from '../pages/PagesAdmin/PrincipalAdmin';
import AdminRecomendaciones from '../pages/PagesAdmin/AdminRecomendacion';
// ------------------- Páginas Trabajador -------------------
import DetallesPedido from '../pages/PagesTrabajador/DetallesPedido';
import Formulario from '../pages/PagesTrabajador/Formulario';
import EstadosPedidos from '../pages/PagesTrabajador/EstadosPedidos';
import HistorialPedidos from '../pages/PagesTrabajador/HistorialPedidos';
import InfoCliente from '../pages/PagesTrabajador/InfoCliente';
import Inicio from '../pages/PagesTrabajador/Inicio';
import ListaPedidos from '../pages/PagesTrabajador/ListaPedidos';
import EditarPerfil from '../pages/PagesTrabajador/EditarPerfil';
import EntregaLocal from '../pages/PagesClientes/EntregaLocal';

const AppRouter = () => {
  return (
    
    <Routes>

      <Route path='/' element={<MainLayoutSinLogin><HomeSinRegistrar></HomeSinRegistrar></MainLayoutSinLogin>}></Route>
      {/* Cliente */}
      <Route path='/home' element={<PrivateRoute role="cliente"><RutasLayouts><Home></Home></RutasLayouts></PrivateRoute>} />
      <Route path="/conocenos" element={<PrivateRoute role="cliente"><MainLayout><Conocenos /></MainLayout></PrivateRoute>} />
      <Route path="/InfoLegal" element={<layoutCliente><InfoLegal /></layoutCliente>} />
      <Route path="/ManifiestoConsumidor" element={<PrivateRoute role="cliente"><MainLayout><ManifiestoConsumidor /></MainLayout></PrivateRoute>} />
      <Route path='/TYC' element={<layoutCliente ><TYC /></layoutCliente>} />
      <Route path='/PoliticaPrivacidad' element={<layoutCliente><PoliticaPrivacidad /></layoutCliente>} />
      <Route path='/PoliticaCo' element={<layoutCliente><PoliticaCo /></layoutCliente>} />
      <Route path='/categorias/CategoriaPanes' element={<layoutCliente><CategoriasPanes/></layoutCliente>} />
      <Route path='/categorias/CategoriasFritos' element={<layoutCliente><CategoriasFritos /></layoutCliente>} />
      <Route path='/categorias/CategoriasHelados' element={<layoutCliente><CategoriasHelados /></layoutCliente>} />
      <Route path='/categorias/CategoriasMecato' element={<layoutCliente><CategoriasMecato /></layoutCliente>} />
      <Route path='/categorias/CategoriasBebidas' element={<layoutCliente><CategoriasBebidas /></layoutCliente>} />
      <Route path='/producto/:id' element={<layoutCliente><ProductoDetalle /></layoutCliente>} />
      <Route path='/FacturaProductos' element={<layoutCliente><FacturaProductos></FacturaProductos></layoutCliente>} />
      <Route path='/FormularioEntrega' element={<layoutCliente><FormularioEntrega></FormularioEntrega></layoutCliente>} />
      <Route path='/Favoritos' element={<layoutCliente><MainLayout><Favoritos></Favoritos></MainLayout></ layoutCliente>}></Route>
      <Route path='/CalificarExperiencia' element={<PrivateRoute><MainLayout> <CalificarExperiencia></CalificarExperiencia> </MainLayout></PrivateRoute>}></Route>
      <Route path='/PerfilUsuario' element={<PrivateRoute> <MainLayout> <PerfilUsuario></PerfilUsuario> </MainLayout> </PrivateRoute>}></Route>
      <Route path= '/Recomendacion' element={<PrivateRoute><MainLayout><Recomendacion></Recomendacion> </MainLayout></PrivateRoute>}></Route>
      <Route path='/ActualizarPerfil' element={<PrivateRoute><MainLayout><ActualizarPerfil></ActualizarPerfil></MainLayout></PrivateRoute>}></Route>
      <Route path='/EncuestaCliente' element={<PrivateRoute><MainLayout><EncuestaCliente></EncuestaCliente></MainLayout></PrivateRoute>}></Route>
      
      {/* Rutas publicas */}
      <Route path='/CambioContraseña' element={<MainLayoutSinLogin><CambioDeContraseña></CambioDeContraseña></MainLayoutSinLogin>}></Route>
      <Route path='/OlvidoContraseña' element={<MainLayoutSinLogin><OlvidoContraseña /></MainLayoutSinLogin>} />
      <Route path='/IngresarCodigo' element={<MainLayoutSinLogin><IngresarCodigo /></MainLayoutSinLogin>} />
      <Route path='/Registro' element={<MainLayoutSinLogin><Registro /></MainLayoutSinLogin>} />
      <Route path='/AccedeAqui' element={<MainLayoutSinLogin><AccedeAqui /></MainLayoutSinLogin>} />
      <Route path="/Login" element={<Login />} />



        {/* Trabajador */}
        <Route path='/Formulario' element={<PrivateRoute role="trabajador"><LayoutTrabajador><Formulario /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/EstadosPedidos' element={<LayoutTrabajador><EstadosPedidos /></LayoutTrabajador>} />
        <Route path='/HistorialPedidos' element={<PrivateRoute role="trabajador"><LayoutTrabajador><HistorialPedidos /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/Inicio' element={<PrivateRoute role="trabajador"><LayoutTrabajador><Inicio /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/ListaPedidos' element={<PrivateRoute role="trabajador"><LayoutTrabajador><ListaPedidos /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/DetallesPedido/:id' element={<PrivateRoute role="trabajador"><LayoutTrabajador><DetallesPedido /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/EditarPerfil' element={<PrivateRoute role="trabajador"><LayoutTrabajador><EditarPerfil /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/InfoCliente' element={<LayoutTrabajador><InfoCliente /></LayoutTrabajador>} />
        <Route path= '/EntregaLocal'element={<LayoutTrabajador><EntregaLocal></EntregaLocal></LayoutTrabajador>} />



        {/* Admin */}
        <Route path='/AgregarTrabajador' element={<AdminLayout><AgregarTrabajador /></AdminLayout>} />
        <Route path='/EditarTrabajador/:id' element={<AdminLayout><EditarTrabajador /></AdminLayout>} />
        <Route path='/EliminarTrabajador' element={<AdminLayout><EliminarTrabajador /></AdminLayout>} />
        <Route path='/Cronograma' element={<AdminLayout><Cronograma /></AdminLayout>} />
        <Route path='/AgregarCrono' element={<AdminLayout><AgregarCrono /></AdminLayout>} />
        <Route path='/EditarCrono/:id' element={<AdminLayout><EditarCrono /></AdminLayout>} />
        <Route path='/HistorialPedido' element={<AdminLayout><HistorialPedido /></AdminLayout>} />
        <Route path='/CatalogoAdmin' element={<AdminLayout><Catalogo_Admin /></AdminLayout>} />
        <Route path='/AdministrarInven' element={<AdminLayout><AdministrarInven /></AdminLayout>} />
        <Route path='/AgregarInven' element={<AdminLayout><AgregarInven /></AdminLayout>} />
        <Route path='/EditarInven/:id' element={<AdminLayout><EditarInven /></AdminLayout>} />
        <Route path='/EliminarInven' element={<AdminLayout><EliminarInven /></AdminLayout>} />
        <Route path='/AdministrarTrabajadores' element={<AdminLayout><AdministrarTrabajadores /></AdminLayout>} />
        <Route path='/PrincipalAdmin' element={<AdminLayout><PrincipalAdmin /></AdminLayout>} />
        <Route path='/admin/AdminRecomendaciones'element={<AdminLayout><AdminRecomendaciones/></AdminLayout>}></Route>

    </Routes>
  );
};

export default AppRouter;





