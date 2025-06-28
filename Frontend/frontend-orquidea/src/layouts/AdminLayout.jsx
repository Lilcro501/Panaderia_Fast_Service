// src/layouts/MainLayout.jsx
import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin.jsx';
import Footer from '../components/Footer.jsx';

const AdminLayout = ({ children }) => {
    return (
        <>
            <HeaderAdmin />
            <main style={{ padding: '2rem' }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default AdminLayout;