
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
import TYC from "../pages/PagesClientes/TYC";
import FacturaProductos from '../pages/PagesClientes/FacturaProductos';
import ProductoDetalle from '../components/ProductoDetalle';
import FormularioEntrega from '../pages/PagesClientes/FormularioEntrega';
import ActualizarPerfilUsuario from '../pages/PagesClientes/ActualizarPerfil';

// ------------------- Páginas Cliente No Login -------------------


import AccedeAqui from '../pages/PagesClienteNologin/AccedeAqui';
import HomeSinRegistrar from '../pages/PagesClienteNologin/HomeSinRegistrar';
import Conocenos from '../components/Conocenos';


// ------------------- Páginas Login -------------------
import CambioDeContraseña from "../pages/PagesLogin/CambioContraseña";
import IngresarCodigo from '../pages/PagesLogin/IngresarCodigo';
import OlvidoContraseña from "../pages/PagesLogin/OlvidoContraseña";
import Registro from '../pages/PagesLogin/Registro';

// ------------------- Páginas Administrador -------------------
import AdministrarInven from '../pages/PagesAdmin/AdministrarInven';
import AgregarInven from '../pages/PagesAdmin/AgregarInven';
import EditarInven from '../pages/PagesAdmin/EditarInven';
import Catalogo_Admin from '../pages/PagesAdmin/Catalogo_Admin';
import AdministrarTrabajadores from '../pages/PagesAdmin/AdministrarTrabajadores';
import AgregarTrabajador from '../pages/PagesAdmin/AgregarTrabajador';
import EditarTrabajador from '../pages/PagesAdmin/EditarTrabajador';
import Cronograma from '../pages/PagesAdmin/Cronograma';
import AgregarCrono from '../pages/PagesAdmin/AgregarCrono';
import EditarCrono from '../pages/PagesAdmin/EditarCrono';
import HistorialPedido from '../pages/PagesAdmin/HistorialPedido';
import PrincipalAdmin from '../pages/PagesAdmin/PrincipalAdmin';

// ------------------- Páginas Trabajador -------------------
import DetallesPedido from '../pages/PagesTrabajador/DetallesPedido';
import Formulario from '../pages/PagesTrabajador/Formulario';
import EstadosPedidos from '../pages/PagesTrabajador/EstadosPedidos';
import HistorialPedidos from '../pages/PagesTrabajador/HistorialPedidos';
import InfoCliente from '../pages/PagesTrabajador/InfoCliente';
import Inicio from '../pages/PagesTrabajador/Inicio';
import ListaPedidos from '../pages/PagesTrabajador/ListaPedidos';
import EditarPerfil from '../pages/PagesTrabajador/EditarPerfil';
import CronogramaTrabajador from '../pages/PagesTrabajador/CronogramaTrabajador'

const AppRouter = () => {
  return (
    <Routes>

      {/* Cliente */}
      <Route path='/Home' element={<PrivateRoute role="cliente"><MainLayout><Home></Home></MainLayout></PrivateRoute>} />


      <Route path='/categorias/CategoriaPanes' element={<PrivateRoute role="cliente"><MainLayout><CategoriasPanes /></MainLayout></PrivateRoute>} />
      <Route path='/categorias/CategoriasFritos' element={<PrivateRoute role="cliente"><MainLayout><CategoriasFritos /></MainLayout></PrivateRoute>} />
      <Route path='/categorias/CategoriasHelados' element={<PrivateRoute role="cliente"><MainLayout><CategoriasHelados /></MainLayout></PrivateRoute>} />
      <Route path='/categorias/CategoriasMecato' element={<PrivateRoute role="cliente"><MainLayout><CategoriasMecato /></MainLayout></PrivateRoute>} />
      <Route path='/categorias/CategoriasBebidas' element={<PrivateRoute role="cliente"><MainLayout><CategoriasBebidas /></MainLayout></PrivateRoute>} />
      <Route path='/producto/:id' element={<PrivateRoute role="cliente"><MainLayout><ProductoDetalle /></MainLayout></PrivateRoute>} />
      <Route path='/FacturaProductos' element={<PrivateRoute role="cliente"><MainLayout><FacturaProductos></FacturaProductos></MainLayout></PrivateRoute>} />
      <Route path='/FormularioEntrega' element={<PrivateRoute role="cliente"><MainLayout><FormularioEntrega></FormularioEntrega></MainLayout></PrivateRoute>} />
      <Route path='/Favoritos' element={<PrivateRoute role="cliente"><MainLayout><Favoritos></Favoritos></MainLayout></PrivateRoute>}></Route>
      <Route path='/CalificarExperiencia' element={<PrivateRoute role="cliente"><MainLayout> <CalificarExperiencia></CalificarExperiencia> </MainLayout></PrivateRoute>}></Route>
      <Route path='/PerfilUsuario' element={<PrivateRoute role="cliente"> <MainLayout> <PerfilUsuario></PerfilUsuario> </MainLayout> </PrivateRoute>}></Route>


      {/*Rutas compartidas */}
      <Route path="/Actualizar" element={
        <PrivateRoute role={["cliente", "trabajador"]}>
          {({ userRole }) =>
            userRole === "trabajador" ? (
            <LayoutTrabajador>
              <ActualizarPerfilUsuario />
            </LayoutTrabajador>
            ) : (
            <MainLayout>
              <ActualizarPerfilUsuario />
            </MainLayout>
          )
        }
        </PrivateRoute>
        }
      />
      <Route
        path="/conocenos"
          element={
          <PrivateRoute role={["cliente", "sin-registrar"]}>
          {({ userRole }) =>
          userRole === "cliente" ? (
            <MainLayout>
              <Conocenos />
            </MainLayout>
            ) : (
          <MainLayoutSinLogin>
            <Conocenos />
          </MainLayoutSinLogin>
            )
          }
        </PrivateRoute>
        }
      />

 <Route
  path="/InfoLegal"
  element={
    <PrivateRoute role={["admin", "trabajador", "cliente", "sin-registrar"]}>
      {({ userRole }) =>
        userRole === "admin" ? (
          <AdminLayout><InfoLegal /></AdminLayout>
        ) : userRole === "trabajador" ? (
          <LayoutTrabajador><InfoLegal /></LayoutTrabajador>
        ) : userRole === "cliente" ? (
          <MainLayout><InfoLegal /></MainLayout>
        ) : (
          <MainLayoutSinLogin><InfoLegal /></MainLayoutSinLogin>
        )
      }
    </PrivateRoute>
  }
/>
<Route
  path="/ManifiestoConsumidor"
  element={
    <PrivateRoute role={["admin", "trabajador", "cliente", "sin-registrar"]}>
      {({ userRole }) =>
        userRole === "admin" ? (
          <AdminLayout><ManifiestoConsumidor /></AdminLayout>
        ) : userRole === "trabajador" ? (
          <LayoutTrabajador><ManifiestoConsumidor /></LayoutTrabajador>
        ) : userRole === "cliente" ? (
          <MainLayout><ManifiestoConsumidor /></MainLayout>
        ) : (
          <MainLayoutSinLogin><ManifiestoConsumidor /></MainLayoutSinLogin>
        )
      }
    </PrivateRoute>
  }
/>

<Route
  path="/TYC"
  element={
    <PrivateRoute role={["admin", "trabajador", "cliente", "sin-registrar"]}>
      {({ userRole }) =>
        userRole === "admin" ? (
          <AdminLayout><TYC /></AdminLayout>
        ) : userRole === "trabajador" ? (
          <LayoutTrabajador><TYC /></LayoutTrabajador>
        ) : userRole === "cliente" ? (
          <MainLayout><TYC /></MainLayout>
        ) : (
          <MainLayoutSinLogin><TYC /></MainLayoutSinLogin>
        )
      }
    </PrivateRoute>
  }
/>

<Route
  path="/PoliticaPrivacidad"
  element={
    <PrivateRoute role={["admin", "trabajador", "cliente", "sin-registrar"]}>
      {({ userRole }) =>
        userRole === "admin" ? (
          <AdminLayout><PoliticaPrivacidad /></AdminLayout>
        ) : userRole === "trabajador" ? (
          <LayoutTrabajador><PoliticaPrivacidad /></LayoutTrabajador>
        ) : userRole === "cliente" ? (
          <MainLayout><PoliticaPrivacidad /></MainLayout>
        ) : (
          <MainLayoutSinLogin><PoliticaPrivacidad /></MainLayoutSinLogin>
        )
      }
    </PrivateRoute>
  }
/>

<Route
  path="/PoliticaCo"
  element={
    <PrivateRoute role={["admin", "trabajador", "cliente", "sin-registrar"]}>
      {({ userRole }) =>
        userRole === "admin" ? (
          <AdminLayout><PoliticaCo /></AdminLayout>
        ) : userRole === "trabajador" ? (
          <LayoutTrabajador><PoliticaCo /></LayoutTrabajador>
        ) : userRole === "cliente" ? (
          <MainLayout><PoliticaCo /></MainLayout>
        ) : (
          <MainLayoutSinLogin><PoliticaCo /></MainLayoutSinLogin>
        )
      }
    </PrivateRoute>
  }
/>

<Route
  path="/PoliticaCo"
  element={
    <PrivateRoute role={["admin", "trabajador", "cliente", "sin-registrar"]}>
      {({ userRole }) =>
        userRole === "admin" ? (
          <AdminLayout><PoliticaCo /></AdminLayout>
        ) : userRole === "trabajador" ? (
          <LayoutTrabajador><PoliticaCo /></LayoutTrabajador>
        ) : userRole === "cliente" ? (
          <MainLayout><PoliticaCo /></MainLayout>
        ) : (
          <MainLayoutSinLogin><PoliticaCo /></MainLayoutSinLogin>
        )
      }
    </PrivateRoute>
  }
/>

      {/* Rutas sin registrar*/}
      <Route path='/' element={<PrivateRoute role="sin-registrar"><MainLayoutSinLogin><HomeSinRegistrar /></MainLayoutSinLogin></PrivateRoute>}/>
      <Route path='/AccedeAqui' element={<PrivateRoute role="sin-registrar"><MainLayoutSinLogin><AccedeAqui /></MainLayoutSinLogin></PrivateRoute>} />





      <Route path='/CambioContraseña' element={<MainLayoutSinLogin><CambioDeContraseña></CambioDeContraseña></MainLayoutSinLogin>}></Route>
      <Route path='/OlvidoContraseña' element={<MainLayoutSinLogin><OlvidoContraseña /></MainLayoutSinLogin>} />
      <Route path='/IngresarCodigo' element={<MainLayoutSinLogin><IngresarCodigo /></MainLayoutSinLogin>} />
      <Route path='/Registro' element={<MainLayoutSinLogin><Registro /></MainLayoutSinLogin>} />




        {/* Rutas publicas */}

        {/* Trabajador */}
        <Route path='/Formulario' element={<PrivateRoute role="trabajador"><LayoutTrabajador><Formulario /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/EstadosPedidos' element={<PrivateRoute role="trabajador"><LayoutTrabajador><EstadosPedidos /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/HistorialPedidos' element={<PrivateRoute role="trabajador"><LayoutTrabajador><HistorialPedidos /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/InfoCliente/:id' element={<PrivateRoute role="trabajador"><LayoutTrabajador><InfoCliente /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/Inicio' element={<PrivateRoute role="trabajador"><LayoutTrabajador><Inicio /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/ListaPedidos/' element={<PrivateRoute role="trabajador"><LayoutTrabajador><ListaPedidos /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/DetallesPedido/:id' element={<PrivateRoute role="trabajador"><LayoutTrabajador><DetallesPedido /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/EditarPerfil' element={<PrivateRoute role="trabajador"><LayoutTrabajador><EditarPerfil /></LayoutTrabajador></PrivateRoute>} />
        <Route path='/InfoCliente' element={<LayoutTrabajador><InfoCliente /></LayoutTrabajador>} />
        <Route path='/CronogramaTrabajador' element={<PrivateRoute role="trabajador"><LayoutTrabajador><CronogramaTrabajador /></LayoutTrabajador></PrivateRoute>} />


        {/* Admin */}
        <Route path='/AgregarTrabajador' element={<PrivateRoute role="admin"><AgregarTrabajador></AgregarTrabajador></PrivateRoute>} />
        <Route path='/EditarTrabajador/:id' element={<PrivateRoute role="admin"><AdminLayout><EditarTrabajador /></AdminLayout></PrivateRoute>} />
        <Route path='/Cronograma' element={<PrivateRoute role="admin"><AdminLayout><Cronograma /></AdminLayout></PrivateRoute>} />
        <Route path='/AgregarCrono' element={<PrivateRoute role="admin"><AdminLayout><AgregarCrono /></AdminLayout></PrivateRoute>} />
        <Route path='/EditarCrono/:id' element={<PrivateRoute role="admin"> <EditarCrono></EditarCrono></PrivateRoute>} />
        <Route path='/HistorialPedido' element={<PrivateRoute role="admin"><AdminLayout><HistorialPedido /></AdminLayout> </PrivateRoute>} />
        <Route path='/CatalogoAdmin' element={<PrivateRoute role="admin"><AdminLayout><Catalogo_Admin /></AdminLayout></PrivateRoute>} />
        <Route path='/AdministrarInven' element={<PrivateRoute role="admin"><AdminLayout><AdministrarInven /></AdminLayout></PrivateRoute>} />
        <Route path='/AgregarInven' element={<PrivateRoute role="admin"><AdminLayout><AgregarInven /></AdminLayout></PrivateRoute>} />
        <Route path='/EditarInven/:id' element={<PrivateRoute role="admin"><AdminLayout><EditarInven /></AdminLayout></PrivateRoute>} />
        <Route path='/AdministrarTrabajadores' element={<PrivateRoute role="admin"><AdminLayout><AdministrarTrabajadores /></AdminLayout></PrivateRoute>} />
        <Route path='/PrincipalAdmin' element={<PrivateRoute role="admin"><AdminLayout><PrincipalAdmin /></AdminLayout></PrivateRoute>} />

    </Routes>
  );
};

export default AppRouter;