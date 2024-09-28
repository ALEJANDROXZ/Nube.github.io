import {logout, userstate, verificationcod}from "./global.js";

userstate()

const crear = document.getElementById('btnCrear')
const recuperar =document.getElementById('btnRecuperar')
const cerrar = document.getElementById('btnCerrarSesion')

async function crearResgistro() {
    window.location.href = "../Templates/registro.html"
}

async function recuperarContraseña(){
    const email = document.getElementById('edtemail').value

    const verificar = verificationcod(email)
    const validation = await verificar

    .then((validation)=> {
        alert("Reset verification succesfull"+email)
        window.location.href="../Templates/main_admin.html"
    })
    .catch ((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    })

}

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

window.addEventListener('DOMContentLoaded',async()=>{
    cerrar.addEventListener('click', sesion)
    crear.addEventListener('click', crearResgistro)
    recuperar.addEventListener('click',recuperarContraseña)
})


