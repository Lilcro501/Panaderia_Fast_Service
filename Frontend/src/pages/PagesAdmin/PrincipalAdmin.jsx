import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../../assets/styles/PrincipalAdmin.css';

const AdminPage = () => {
    const [productoMasVendido, setProductoMasVendido] = useState(null);
    const [gananciasPorMes, setGananciasPorMes] = useState([]);
    const chartRef = useRef(null);
    const pieChartRef = useRef(null);
    const reportRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/estadisticas/')
            .then(res => {
                setProductoMasVendido(res.data.producto_mas_vendido);
                setGananciasPorMes(res.data.ganancias_por_mes);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (gananciasPorMes.length && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: gananciasPorMes.map(item =>
                        new Date(item.mes).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
                    ),
                    datasets: [{
                        label: 'Ganancias ($)',
                        data: gananciasPorMes.map(item => item.total),
                        backgroundColor: '#4e79a7'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
    }, [gananciasPorMes]);

    useEffect(() => {
        if (productoMasVendido && pieChartRef.current) {
            const ctx = pieChartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [productoMasVendido.id_producto__nombre, 'Otros'],
                    datasets: [{
                        data: [productoMasVendido.total_vendidos, 100 - productoMasVendido.total_vendidos],
                        backgroundColor: ['#f28e2b', '#d3d3d3']
                    }]
                },
                options: {
                    responsive: true,
                }
            });
        }
    }, [productoMasVendido]);

    const generarPDF = async () => {
        const canvas = await html2canvas(reportRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('reporte_estadisticas.pdf');
    };

    return (
        <div className="admin-container">
            <h1 className="titulo">Estadísticas del Administrador</h1>

            <div ref={reportRef}>
                <div className="grafico-contenedor">
                    <h2>Producto más vendido</h2>
                    <canvas ref={pieChartRef} width="400" height="400"></canvas>
                    {productoMasVendido && (
                        <p className="texto-info">
                            {productoMasVendido.id_producto__nombre} ({productoMasVendido.total_vendidos} unidades vendidas)
                        </p>
                    )}
                </div>

                <div className="grafico-contenedor">
                    <h2>Ganancias por Mes</h2>
                    <canvas ref={chartRef} width="600" height="400"></canvas>
                </div>
            </div>

            <button className="btn-descargar" onClick={generarPDF}>Descargar Informe en PDF</button>
        </div>
    );
};

export default AdminPage;
