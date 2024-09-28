import {logout, userstate, verificationcod,getCurrentUser}from "./global.js";

userstate()

const cerrar = document.getElementById('btnlogout')
const recuperar = document.getElementById('btnrecuperar')

async function sesion(){
    try {
    await logout();
    alert('Sesión cerrada');
    window.location.href = "../index.html";
    } catch (error) {
    alert('Error al cerrar sesión: ' + error.message);
    console.error('Error al cerrar sesión:', error);
    }
}

async function recuperarContraseña() {
    const email = document.getElementById('edtcorreo').value;

    // Obtener el usuario actual autenticado
    const currentUser = getCurrentUser();

    // Verificar si el correo ingresado coincide con el del usuario actual
    if (currentUser && currentUser.email === email) {
        try {
            await verificationcod(email);
            alert("Reset verification successful for " + email);
            window.location.href = "../Templates/main_user.html";
        } catch (error) {
            alert("Error al verificar el código de recuperación: " + error.message);
            console.error('Error al verificar el código de recuperación:', error);
        }
    } else {
        alert("No tienes permiso para cambiar la contraseña de esta cuenta.");
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    cerrar.addEventListener('click',sesion)
    recuperar.addEventListener('click',recuperarContraseña)
})