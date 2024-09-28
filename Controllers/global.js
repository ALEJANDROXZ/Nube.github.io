import {
  initializeApp
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc
} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0xGyc8OLyym1gFCgXQDr65px0Vd3z2Y4",
  authDomain: "nube2024-2b2d7.firebaseapp.com",
  projectId: "nube2024-2b2d7",
  storageBucket: "nube2024-2b2d7.appspot.com",
  messagingSenderId: "536550035398",
  appId: "1:536550035398:web:fe550a168a2f3285706cc7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializamos Firestore

// Método de autenticación de usuario
export const ctrlaccessuser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Observador de autenticación
export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("Usuario autenticado: " + uid);
    } else {
      window.location.href = "../index.html";
    }
  });
}

// Cerrar sesión
export const logout = () => signOut(auth);

// Registrar Usuario Nuevo
export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Verificar usuario
export const verification = () => sendEmailVerification(auth.currentUser);

// Restablecer contraseña
export const verificationcod = (email) =>
  sendPasswordResetEmail(auth, email);

// Guardar datos de usuario en Firestore
export const saveUserToFirestore = async (userId, email, userType) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      uid: userId,
      email: email,
      userType: userType // Añadir tipo de usuario
    });
    console.log("Documento registrado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error agregando el documento: ", e);
  }
};

// Obtener el usuario actualmente autenticado
export function getCurrentUser() {
  const user = auth.currentUser;
  return user ? { email: user.email } : null;
}
