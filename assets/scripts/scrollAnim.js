// Función para manejar la clase de animación de #proyectosTitle
function handleProyectosTitleAnimation() {
    const proyectosTitle = document.getElementById('proyectosTitle');
    const proyectosRect = proyectosTitle.getBoundingClientRect();

    // Verificar si el título está visible en el viewport
    const isProyectosTitleVisible = proyectosRect.top < window.innerHeight && proyectosRect.bottom > 0;

    // Si el título es visible, añadir la clase de animación
    if (isProyectosTitleVisible) {
        proyectosTitle.classList.add('scroll-arranged');
    } else {
        // Eliminar la clase cuando el título ya no es visible
        proyectosTitle.classList.remove('scroll-arranged');
    }
}

// Función para manejar la rotación de los pseudo-elementos ::before y ::after de #proyectos
function handleProyectosRotation() {
    const proyectos = document.getElementById('proyectos');
    const proyectosRect = proyectos.getBoundingClientRect();

    // Verificamos si #proyectos está visible en el viewport
    const isProyectosVisible = proyectosRect.top < window.innerHeight && proyectosRect.bottom > 3;

    if (isProyectosVisible) {
        // Calcula la rotación basada en la posición de scroll
        const scrollOffset = window.scrollY - proyectosRect.top;
        const rotationAngle = scrollOffset * 0.1; // Ajusta la velocidad de rotación

        // Rotación para el ::after
        proyectos.style.setProperty('--after-rotation', `rotate(${rotationAngle}deg)`);

        // Rotación inversa para el ::before
        proyectos.style.setProperty('--before-rotation', `rotate(${-rotationAngle}deg)`);
    } else {
        // Resetea la rotación si el contenedor no está visible
        proyectos.style.setProperty('--after-rotation', 'rotate(0deg)');
        proyectos.style.setProperty('--before-rotation', 'rotate(0deg)');
    }
}


// Escucha del evento de scroll y llamadas a las funciones correspondientes
window.addEventListener('scroll', () => {
    handleProyectosRotation();        // Rotación del ::after de #proyectos
    handleProyectosTitleAnimation();  // Animación del título #proyectosTitle
});
