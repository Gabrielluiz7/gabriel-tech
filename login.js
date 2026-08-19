// ==========================================================
// GABRIEL TECH // LOGIN FIREBASE
// LOGIN + CADASTRO + RECUPERAÇÃO DE SENHA
// ==========================================================


// ==========================================================
// IMPORTS FIREBASE
// ==========================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


// ==========================================================
// CONFIGURAÇÃO FIREBASE
// ==========================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyCQLUlNf8OcOFcS1yaqcXkrJkfSzY-SPD0",

    authDomain:
        "gabriel-tech.firebaseapp.com",

    projectId:
        "gabriel-tech",

    storageBucket:
        "gabriel-tech.firebasestorage.app",

    messagingSenderId:
        "200444973273",

    appId:
        "1:200444973273:web:23c2d45119d6e0764d2ec8",

    measurementId:
        "G-KDV1R2J72M"
};


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


// Deixa os e-mails do Firebase em português quando possível
auth.languageCode = "pt-BR";


// ==========================================================
// ELEMENTOS DO LOGIN
// ==========================================================

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");


const registerForm =
    document.getElementById("registerForm");

const registerName =
    document.getElementById("registerName");

const registerEmail =
    document.getElementById("registerEmail");

const registerPassword =
    document.getElementById("registerPassword");


const showRegister =
    document.getElementById("showRegister");

const backToLogin =
    document.getElementById("backToLogin");

const forgotPassword =
    document.getElementById("forgotPassword");

const authMessage =
    document.getElementById("authMessage");


// ==========================================================
// MENSAGENS DA INTERFACE
// ==========================================================

function showMessage(
    text,
    type = "error"
) {

    if (!authMessage) {
        return;
    }

    authMessage.textContent =
        text;

    authMessage.className =
        "auth-message " + type;
}


function clearMessage() {

    if (!authMessage) {
        return;
    }

    authMessage.textContent =
        "";

    authMessage.className =
        "auth-message";
}


// ==========================================================
// ABRIR CADASTRO
// ==========================================================

if (
    showRegister &&
    loginForm &&
    registerForm
) {

    showRegister.addEventListener(
        "click",

        () => {

            clearMessage();

            loginForm.style.display =
                "none";

            showRegister.style.display =
                "none";

            registerForm.classList.add(
                "active"
            );

        }
    );
}


// ==========================================================
// VOLTAR AO LOGIN
// ==========================================================

if (
    backToLogin &&
    loginForm &&
    registerForm &&
    showRegister
) {

    backToLogin.addEventListener(
        "click",

        () => {

            clearMessage();

            registerForm.classList.remove(
                "active"
            );

            loginForm.style.display =
                "flex";

            showRegister.style.display =
                "block";

        }
    );
}


// ==========================================================
// LOGIN
// ==========================================================

if (
    loginForm &&
    loginEmail &&
    loginPassword
) {

    loginForm.addEventListener(

        "submit",

        async (event) => {

            event.preventDefault();

            clearMessage();


            const email =
                loginEmail.value.trim();

            const password =
                loginPassword.value;


            if (
                !email ||
                !password
            ) {

                showMessage(
                    "Preencha o e-mail e a senha."
                );

                return;
            }


            showMessage(
                "Conectando...",
                "success"
            );


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                showMessage(
                    "Login realizado! Entrando no Fórum...",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "forum.html";

                    },
                    700
                );

            }

            catch (error) {

                console.error(
                    "Erro no login:",
                    error
                );

                handleFirebaseError(
                    error
                );
            }

        }
    );
}


// ==========================================================
// CRIAR CONTA
// ==========================================================

if (
    registerForm &&
    registerName &&
    registerEmail &&
    registerPassword
) {

    registerForm.addEventListener(

        "submit",

        async (event) => {

            event.preventDefault();

            clearMessage();


            const name =
                registerName.value.trim();

            const email =
                registerEmail.value.trim();

            const password =
                registerPassword.value;


            if (
                !name ||
                !email ||
                !password
            ) {

                showMessage(
                    "Preencha todos os campos."
                );

                return;
            }


            if (name.length < 2) {

                showMessage(
                    "Digite um nome válido."
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    "A senha precisa ter pelo menos 6 caracteres."
                );

                return;
            }


            showMessage(
                "Criando sua conta...",
                "success"
            );


            try {

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                await updateProfile(
                    userCredential.user,
                    {
                        displayName:
                            name
                    }
                );


                showMessage(
                    "Conta criada! Bem-vindo à Gabriel Tech.",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "forum.html";

                    },
                    900
                );

            }

            catch (error) {

                console.error(
                    "Erro ao criar conta:",
                    error
                );

                handleFirebaseError(
                    error
                );
            }

        }
    );
}


// ==========================================================
// ESQUECI MINHA SENHA
// ==========================================================

if (
    forgotPassword &&
    loginEmail
) {

    forgotPassword.addEventListener(

        "click",

        async () => {

            clearMessage();


            const email =
                loginEmail.value.trim();


            if (!email) {

                showMessage(
                    "Digite seu e-mail primeiro."
                );

                loginEmail.focus();

                return;
            }


            showMessage(
                "Enviando e-mail de recuperação...",
                "success"
            );


            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );


                showMessage(
                    "E-mail enviado! Confira sua caixa de entrada e o spam.",
                    "success"
                );

            }

            catch (error) {

                console.error(
                    "Erro ao recuperar senha:",
                    error
                );


                handleFirebaseError(
                    error,
                    "reset"
                );
            }

        }
    );
}


// ==========================================================
// TRADUZIR ERROS DO FIREBASE
// ==========================================================

function handleFirebaseError(
    error,
    context = "auth"
) {

    switch (error.code) {


        // --------------------------------------------------
        // CADASTRO
        // --------------------------------------------------

        case "auth/email-already-in-use":

            showMessage(
                "Este e-mail já possui uma conta."
            );

            break;


        case "auth/weak-password":

            showMessage(
                "Essa senha é muito fraca."
            );

            break;


        // --------------------------------------------------
        // LOGIN
        // --------------------------------------------------

        case "auth/invalid-credential":

            showMessage(
                "E-mail ou senha incorretos."
            );

            break;


        case "auth/user-disabled":

            showMessage(
                "Esta conta foi desativada."
            );

            break;


        // --------------------------------------------------
        // E-MAIL
        // --------------------------------------------------

        case "auth/invalid-email":

            showMessage(
                "Digite um endereço de e-mail válido."
            );

            break;


        // --------------------------------------------------
        // SEGURANÇA
        // --------------------------------------------------

        case "auth/too-many-requests":

            showMessage(
                "Muitas tentativas. Aguarde um pouco e tente novamente."
            );

            break;


        // --------------------------------------------------
        // CONEXÃO
        // --------------------------------------------------

        case "auth/network-request-failed":

            showMessage(
                "Erro de conexão. Verifique sua internet."
            );

            break;


        // --------------------------------------------------
        // PADRÃO
        // --------------------------------------------------

        default:

            if (context === "reset") {

                showMessage(
                    "Não foi possível enviar o e-mail de recuperação."
                );

            }

            else {

                showMessage(
                    "Não foi possível concluir. Tente novamente."
                );

            }

            break;
    }
}


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

console.log(
    "Gabriel Tech // Authentication iniciado."
);