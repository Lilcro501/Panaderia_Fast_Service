import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../assets/styles/PrincipalAdmin.css';
import logo_header from '../../assets/images/logo_header.png';
import BotonCerrarSesion from '../../components/BotonCerrarSesion';

const AdminPage = () => {
    const [productoMasVendido, setProductoMasVendido] = useState(null);
    const [gananciasPorMes, setGananciasPorMes] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [ventas, setVentas] = useState([]); // NUEVO

    const chartRef = useRef(null);
    const pieChartRef = useRef(null);
    const pieChartCategoriaRef = useRef(null);
    const chartInstanceRef = useRef(null);       
    const pieChartInstanceRef = useRef(null);
    const pieChartCategoriaInstanceRef = useRef(null);

    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [productosPorCategoria, setProductosPorCategoria] = useState([]);
    const [masVendidoCategoria, setMasVendidoCategoria] = useState(null);

    // Cargar estadísticas generales
    useEffect(() => {
        axios.get('http://localhost:8000/api/administrador/estadisticas/')
            .then(res => {
                setProductoMasVendido(res.data.producto_mas_vendido);
                setGananciasPorMes(res.data.ganancias_por_mes);
            })
            .catch(err => console.error(err));
    }, []);

    // Cargar categorías
    useEffect(() => {
        axios.get('http://localhost:8000/api/administrador/categorias/')
            .then(res => setCategorias(res.data))
            .catch(err => console.error(err));
    }, []);

    // Cargar productos por categoría seleccionada
    useEffect(() => {
        if (!categoriaSeleccionada) return;
        axios.get(`http://localhost:8000/api/administrador/productos-por-categoria/?categoria_id=${categoriaSeleccionada}`)
            .then(res => {
                setProductosPorCategoria(res.data.productos);
                setMasVendidoCategoria(res.data.mas_vendido);
            })
            .catch(err => console.error(err));
    }, [categoriaSeleccionada]);

    // Cargar ventas por fecha seleccionada
    useEffect(() => {
        if (!fechaSeleccionada) return;
        axios.get(`http://localhost:8000/api/administrador/ventas-por-fecha/?fecha=${fechaSeleccionada}`)
            .then(res => setVentas(res.data))
            .catch(err => console.error(err));
    }, [fechaSeleccionada]);

    // Chart: Ganancias por mes
    useEffect(() => {
        if (gananciasPorMes.length && chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: gananciasPorMes.map(item =>
                        new Date(item.mes).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
                    ),
                    datasets: [{
                        label: 'Ganancias ($)',
                        data: gananciasPorMes.map(item => item.total),
                        backgroundColor: '#6645b3ff'
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

    // Chart: Producto más vendido
    useEffect(() => {
        if (productoMasVendido && pieChartRef.current) {
            if (pieChartInstanceRef.current) {
                pieChartInstanceRef.current.destroy();
            }

            const ctx = pieChartRef.current.getContext('2d');
            pieChartInstanceRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [productoMasVendido.nombre, 'Otros'],
                    datasets: [{
                        data: [productoMasVendido.cantidad, 100 - productoMasVendido.cantidad],
                        backgroundColor: ['#dd3b3bff', '#a8a2a2ff']
                    }]
                },
                options: { responsive: true }
            });
        }
    }, [productoMasVendido]);

    // Chart: Producto más vendido por categoría
    useEffect(() => {
        if (masVendidoCategoria && pieChartCategoriaRef.current) {
            if (pieChartCategoriaInstanceRef.current) {
                pieChartCategoriaInstanceRef.current.destroy();
            }

            const totalVendidos = productosPorCategoria.reduce(
                (sum, prod) => sum + prod.cantidad_vendida, 0
            );

            const ctx = pieChartCategoriaRef.current.getContext('2d');
            pieChartCategoriaInstanceRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [masVendidoCategoria.nombre, 'Otros'],
                    datasets: [{
                        data: [
                            masVendidoCategoria.cantidad,
                            totalVendidos - masVendidoCategoria.cantidad
                        ],
                        backgroundColor: ['#b36c15ff', '#a79a9aff']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: `Producto más vendido en la categoría`
                        }
                    }
                }
            });
        }
    }, [masVendidoCategoria, productosPorCategoria]);

    // 📄 Generar PDF con ventas + gráficos
    const generarPDF = async (ventas, fechaSeleccionada, incluirGraficos) => {
        const doc = new jsPDF();

        const logo = new Image();
        logo.src = logo_header;
        await new Promise((resolve) => {
            logo.onload = () => {
                doc.addImage(logo, 'PNG', 80, 10, 50, 20);
                resolve();
            };
        });

        const fechaActual = new Date().toLocaleDateString();
        doc.setFontSize(14);
        doc.text('Informe de Ventas', 105, 40, { align: 'center' });
        doc.setFontSize(11);
        doc.text(`Fecha del informe: ${fechaSeleccionada || fechaActual}`, 105, 48, { align: 'center' });

        // Tabla de ventas
        const encabezados = [['Producto', 'Cantidad', 'Subtotal']];
        let datos = [];
        if (Array.isArray(ventas)) {
            ventas.forEach((p) => {
                datos.push([
                    p.id_producto__nombre || 'Desconocido',
                    p.total_vendidos || 0,
                    `$${parseFloat(p.total_ganancia || 0)}`
                ]);
            });
        }


        autoTable(doc, {
            startY: 55,
            head: encabezados,
            body: datos,
            styles: { halign: 'center' },
            headStyles: { fillColor: [70, 130, 180] },
        });

        const totalGeneral = ventas.reduce((acc, p) => acc + parseFloat(p.total_ganancia || 0), 0);

        doc.setFontSize(12);
        doc.text(`Total de todas las ventas: $${totalGeneral}`, 105, doc.lastAutoTable.finalY + 10, { align: 'center' });

        // Gráficos
        if (incluirGraficos) {
            const chart1 = document.getElementById('graficoProducto');
            const chart2 = document.getElementById('graficoGanancias');

            if (chart1 && chart2) {
                const canvas1 = await html2canvas(chart1);
                const canvas2 = await html2canvas(chart2);
                const imgData1 = canvas1.toDataURL('image/png');
                const imgData2 = canvas2.toDataURL('image/png');

                doc.addPage();
                doc.setFontSize(14);
                doc.text('Gráficos de Estadísticas', 105, 20, { align: 'center' });

                doc.addImage(imgData1, 'PNG', 30, 30, 150, 70);
                doc.addImage(imgData2, 'PNG', 30, 110, 150, 70);
            }
        }
        
        doc.save(`Informe_Ventas_${fechaSeleccionada || fechaActual}.pdf`);
    };

    return (
        <div className="admin-container">
            <h1 className="titulo">Estadísticas del Administrador</h1>

            <select onChange={e => setCategoriaSeleccionada(e.target.value)} value={categoriaSeleccionada}>
                <option value="">Seleccione una categoría</option>
                {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                ))}
            </select>

            {categoriaSeleccionada && (
                <div className='categoria-estadisticas'>
                    <div className='lista-productos'>
                        <h2>Productos en esta categoría:</h2>
                        <ul>
                            {productosPorCategoria.map((prod, idx) => (
                                <li key={idx}>{prod.nombre} - Vendidos: {prod.cantidad_vendida}</li>
                            ))}
                        </ul>
                        {masVendidoCategoria && (
                            <h3>Más vendido: {masVendidoCategoria.nombre} ({masVendidoCategoria.cantidad} unidades)</h3>
                        )}
                    </div>
                    <div className="grafico-contenedor">
                        <canvas ref={pieChartCategoriaRef} width="100" height="300"></canvas>
                    </div>
                </div>
            )}

            <div className="grafico-contenedor">
                <h2>Producto más vendido (General)</h2>
                <canvas id="graficoProducto" ref={pieChartRef} width="300" height="300"></canvas>
                {productoMasVendido && (
                    <p className="texto-info">
                        {productoMasVendido.nombre} ({productoMasVendido.cantidad} unidades vendidas)
                    </p>
                )}
            </div>

            <div className="grafico-contenedor">
                <h2>Ganancias por Mes</h2>
                <canvas id="graficoGanancias" ref={chartRef} width="500" height="300"></canvas>
            </div>

            <div className="filtro-descarga">
                <h3>Descarga de informes</h3>
                <input
                    type="date"
                    className="input-fecha"
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    value={fechaSeleccionada}
                />
                <button
                    className="icono-descarga"
                    onClick={() => generarPDF(ventas, fechaSeleccionada, true)}
                >
                    ⬇️
                </button>
                {ventas.length === 0 && fechaSeleccionada && (
                    <p style={{ color: 'red' }}>
                        No hay ventas registradas para esta fecha.
                    </p>
                )}
            </div>
            <BotonCerrarSesion></BotonCerrarSesion>
        </div>
    );
};

export default AdminPage;
