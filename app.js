// Función para verificar si un campo está lleno y válido
function validarCampo(campo, errorSpan, maxLength = null, regex = null) {
    if (campo.value.trim() === '') {
        errorSpan.textContent = `${campo.placeholder} no puede estar vacío.`;
        errorSpan.style.display = 'block';
        return false;
    } else if (maxLength && campo.value.length > maxLength) {
        errorSpan.textContent = `${campo.placeholder} no puede exceder los ${maxLength} caracteres.`;
        errorSpan.style.display = 'block';
        return false;
    } else if (regex && !regex.test(campo.value)) {
        errorSpan.textContent = `El formato de ${campo.placeholder} es incorrecto.`;
        errorSpan.style.display = 'block';
        return false;
    } else {
        errorSpan.style.display = 'none';
        return true;
    }
}

// Función para validar el formulario
function validarFormulario() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');
    const submitBtn = document.getElementById('submitBtn');

    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const asuntoError = document.getElementById('asuntoError');
    const mensajeError = document.getElementById('mensajeError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar cada campo
    const nombreValido = validarCampo(nombre, nombreError, 50);
    const emailValido = validarCampo(email, emailError, 50, emailRegex);
    const asuntoValido = validarCampo(asunto, asuntoError, 50);
    const mensajeValido = mensaje.value.trim() !== ''; // Solo verificamos que no esté vacío

    if (!mensajeValido) {
        mensajeError.textContent = 'El mensaje no puede estar vacío.';
        mensajeError.style.display = 'block';
    } else {
        mensajeError.style.display = 'none';
    }

    // Habilitar el botón si todos los campos son válidos
    submitBtn.disabled = !(nombreValido && emailValido && asuntoValido && mensajeValido);
}

// Ejecutar validaciones en cada entrada
document.getElementById('contactoForm').addEventListener('input', validarFormulario);

// Validar el formulario antes de enviar
document.getElementById('contactoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario si hay errores

    if (!document.getElementById('submitBtn').disabled) {
        alert('Mensaje enviado correctamente.');
    }
});