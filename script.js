
const clientes = [
    { tipoDocumento: 'CC', numeroDocumento: '123456789', nombreCompleto: 'Alejandro Gil' },
    { tipoDocumento: 'CE', numeroDocumento: '87654321', nombreCompleto: 'Mariana López' },
    { tipoDocumento: 'PAS', numeroDocumento: '11111', nombreCompleto: 'Cristian Marin' }
];

const tiposDocumento = [
    { codigo: 'CC', nombre: 'Cédula de Ciudadanía' },
    { codigo: 'CE', nombre: 'Cédula de Extranjería' },
    { codigo: 'PAS', nombre: 'Pasaporte' },
    { codigo: 'PPT', nombre: 'Permiso de Permanencia Temporal' }
];

const tasas = [
    { codigo: 'USD', nombre: 'Dólar Estadounidense', compra: 4030, venta: 4170 },
    { codigo: 'EUR', nombre: 'Euro', compra: 4200, venta: 4250 },
    { codigo: 'GBP', nombre: 'Libra Esterlina', compra: 5000, venta: 5100 }
];

const diasHabiles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];


function inicializarFormulario() {
    // Verificar día hábil
    const hoy = new Date();
    const diaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][hoy.getDay()];
    
    if (!diasHabiles.includes(diaSemana)) {
        alert('Transacción no permitida el día de hoy');
        window.close();
        return;
    }
    
    
    const selectTipoDoc = document.getElementById('tipoDocumento');
    tiposDocumento.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.codigo;
        option.textContent = tipo.nombre;
        selectTipoDoc.appendChild(option);
    });
    
    
    const selectMoneda = document.getElementById('moneda');
    tasas.forEach(moneda => {
        const option = document.createElement('option');
        option.value = moneda.codigo;
        option.textContent = moneda.nombre;
        selectMoneda.appendChild(option);
    });
    
    
    document.getElementById('fecha').value = hoy.toLocaleDateString();
    
    
    actualizarHora();
    setInterval(actualizarHora, 1000);
}

// actualizar hora en tiempo real
function actualizarHora() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    document.getElementById('hora').value = `${hora}:${minutos}:${segundos}`;
}

// Función para validar cliente
function validarCliente() {
    const tipoDoc = document.getElementById('tipoDocumento').value;
    const numDoc = document.getElementById('numeroDocumento').value;
    
    if (tipoDoc === '-1' || !numDoc) return;
    
    const cliente = clientes.find(c => c.tipoDocumento === tipoDoc && c.numeroDocumento === numDoc);
    
    if (cliente) {
        document.getElementById('nombreCliente').value = cliente.nombreCompleto;
    } else {
        alert('Cliente Inexistente');
        document.getElementById('nombreCliente').value = '';
    }
}

// Función para actualizar tasa de compra
function actualizarTasa() {
    const codigoMoneda = document.getElementById('moneda').value;
    
    if (codigoMoneda === '-1') {
        document.getElementById('tasaCompra').value = '';
        return;
    }
    
    const moneda = tasas.find(m => m.codigo === codigoMoneda);
    document.getElementById('tasaCompra').value = moneda.compra;
    calcularValorPagar();
}

// Función para calcular valor a pagar
function calcularValorPagar() {
    const tasa = parseFloat(document.getElementById('tasaCompra').value) || 0;
    const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
    document.getElementById('valorPagar').value = (tasa * cantidad).toFixed(2);
}

// Función para guardar transacción
function guardarTransaccion() {
    // Validar formulario
    const form = document.getElementById('formCompra');
    if (!form.checkValidity()) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }
    
    // Aquí iría la lógica para guardar la transacción
    // Por ahora solo mostramos un mensaje
    alert('Transacción guardada exitosamente');
    form.reset();
    
    // Restablecer campos dinámicos
    document.getElementById('nombreCliente').value = '';
    document.getElementById('tasaCompra').value = '';
    document.getElementById('valorPagar').value = '';
    document.getElementById('fecha').value = new Date().toLocaleDateString();
}