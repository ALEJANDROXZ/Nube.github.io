import { registerauth, verification, saveUserToFirestore, userstate } from "./global.js";
userstate();

const crear = document.getElementById('btncrear');
const atras = document.getElementById('btnatras');

async function atrasSesion() {
  window.location.href = "../Templates/main_admin.html";
}

async function register() {
  try {
    const email = document.getElementById('edtuser').value;
    const confirmEmail = document.getElementById('confirmEmail').value;
    const psw = document.getElementById('edtpsw').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value; // Obtener el tipo de usuario seleccionado
    
    // Validar que el correo y la confirmación coincidan
    if (email !== confirmEmail) {
      alert('Los correos no coinciden.');
      return;
    }

    // Validar que la contraseña y su confirmación coincidan
    if (psw !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validar que la contraseña cumpla con los requisitos (lo veremos en el siguiente paso)
    if (!validarPassword(psw)) {
      alert('La contraseña no cumple con los requisitos de seguridad.');
      return;
    }
    
    const userCredential = await registerauth(email, psw);
    const user = userCredential.user;

    // Guardar los datos del usuario en Firestore
    await saveUserToFirestore(user.uid, email, userType);

    // Enviar el correo de verificación
    await verification();
    alert('El usuario se registró exitosamente. Verifique su correo para continuar.');
    window.location.href = "../Templates/registro.html";
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(`Código de error: ${error.code}`, error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('edtpsw');
  const togglePassword = document.getElementById('togglePassword');

  togglePassword.addEventListener('change', () => {
    if (togglePassword.checked) {
      passwordInput.type = 'text'; // Mostrar la contraseña
    } else {
      passwordInput.type = 'password'; // Ocultar la contraseña
    }
  });
});

window.addEventListener('DOMContentLoaded', async () => {
  crear.addEventListener('click', register);
  atras.addEventListener('click', atrasSesion);
});

function validarPassword(password) {
  const minLength = 8;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  if (password.length < minLength) {
    return false;
  }

  return regex.test(password); // Verifica mayúsculas, minúsculas, números y caracteres especiales
}