// Obtener todos los elementos del DOM
const modals = [
    {
        dialog: document.getElementById("myDialog"),
        openBtn: document.getElementById("openModalBtn"),
        closeBtn: document.getElementById("closeModalBtn"),
        actionBtn: document.getElementById("actionBtn"),
        modalContent: document.querySelector(".modal-content")
    },
    {
        dialog: document.getElementById("myDialogFreeTemplate"),
        openBtn: document.getElementById("openModalTemplateBtn"),
        closeBtn: document.getElementById("closeModalTemplateBtn"),
        actionBtn: document.getElementById("actionTemplateBtn"),
        modalContent: document.querySelector(".modal-content-template")
    }
];

// Función para abrir el modal
function openModal(modal) {
    disableScroll();
    modal.dialog.showModal();
    setTimeout(() => {
        modal.dialog.classList.remove('close');
        modal.dialog.classList.add('open');
    }, 10);
}

// Función para cerrar el modal
function closeModal(modal) {
    modal.dialog.classList.remove('open');
    modal.dialog.classList.add('close');
    setTimeout(() => {
        modal.dialog.close();
        enableScroll();
    }, 300);
}

// Función para deshabilitar el scroll
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Función para habilitar el scroll
function enableScroll() {
    document.body.style.overflow = '';
}

// Inicializar los modales
modals.forEach((modal) => {
    modal.openBtn.onclick = () => openModal(modal);
    modal.closeBtn.onclick = () => closeModal(modal);
    modal.actionBtn.onclick = () => {
        alert("Acción ejecutada!");
        closeModal(modal);
    };

    // Cerrar el modal al hacer clic fuera del contenido
    modal.dialog.addEventListener('click', function (event) {
        if (!modal.modalContent.contains(event.target)) {
            closeModal(modal);
        }
    });
});
