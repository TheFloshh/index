
async function cargarIndicadoresEconomicos() {
    try {
        
        const data = [
            { moneda: 'Dólar', valor: 4092 },
            { moneda: 'Euro', valor: 4654 },
            { moneda: 'Libra', valor: 5554 }
        ];
        
        const tabla = document.querySelector('#tablaIndicadores tbody');
        tabla.innerHTML = '';
        
        data.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.moneda}</td>
                <td>$${item.valor}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar indicadores:', error);
        alert('No se pudieron cargar los indicadores económicos');
    }
}


async function cargarTasasCompraVenta() {
    try {

        const data = [
            { moneda: 'Dólar', compra: 4030, venta: 4170 },
            { moneda: 'Euro', compra: 4460, venta: 4610 }
        ];
        
        const tabla = document.querySelector('#tablaTasas tbody');
        tabla.innerHTML = '';
        
        data.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.moneda}</td>
                <td>$${item.compra}</td>
                <td>$${item.venta}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar tasas:', error);
        alert('No se pudieron cargar las tasas de compra/venta');
    }
}