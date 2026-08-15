// ==========================================================
// GABRIEL TECH // FÓRUM FIREBASE
// CHAT EM TEMPO REAL + AUTH + EMOJIS + FIGURINHAS
// ==========================================================


// ==========================================================
// FIREBASE IMPORTS
// ==========================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


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
// INICIALIZAR FIREBASE
// ==========================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);

const db =
    getFirestore(app);


// ==========================================================
// ELEMENTOS DO FÓRUM
// ==========================================================

const messagesContainer =
    document.getElementById("messagesContainer");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const emojiButton =
    document.getElementById("emojiButton");

const openStickers =
    document.getElementById("openStickers");

const closeStickers =
    document.getElementById("closeStickers");

const stickerPanel =
    document.getElementById("stickerPanel");

const stickers =
    document.querySelectorAll(".sticker");

    const currentUserName =
    document.getElementById("currentUserName");

const authButton =
    document.getElementById("authButton");


// ==========================================================
// USUÁRIO ATUAL
// ==========================================================

let currentUser = null;


// ==========================================================
// AUTH
// ==========================================================

onAuthStateChanged(
    auth,

    (user) => {

        currentUser = user;


        if (user) {

            const userName =
                user.displayName ||
                user.email?.split("@")[0] ||
                "Usuário";


            currentUserName.textContent =
                "👾 " + userName;


            authButton.textContent =
                "SAIR";


            messageInput.disabled = false;

            sendButton.disabled = false;

            emojiButton.disabled = false;

            openStickers.disabled = false;


            messageInput.placeholder =
                "Digite uma mensagem...";


            loadMessages();

        }

        else {

            currentUserName.textContent =
                "VISITANTE";


            authButton.textContent =
                "ENTRAR";


            messageInput.disabled = true;

            sendButton.disabled = true;

            emojiButton.disabled = true;

            openStickers.disabled = true;


            messageInput.placeholder =
                "Faça login para participar do chat.";

        }

    }
);


// ==========================================================
// PEGAR INICIAIS
// ==========================================================

function getInitials(name) {

    const parts =
        name
        .trim()
        .split(/\s+/);


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


// ==========================================================
// HORÁRIO
// ==========================================================

function formatTime(timestamp) {

    if (!timestamp) {

        return "agora";

    }


    const date =
        timestamp.toDate();


    return date.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// ==========================================================
// ROLAR PARA O FINAL
// ==========================================================

function scrollToBottom() {

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}


// ==========================================================
// LIMPAR MENSAGENS DO FIREBASE
// ==========================================================

function clearFirebaseMessages() {

    const firebaseMessages =
        messagesContainer.querySelectorAll(
            ".firebase-message"
        );


    firebaseMessages.forEach(
        element => element.remove()
    );

}


// ==========================================================
// CRIAR MENSAGEM VISUAL
// ==========================================================

function renderMessage(data) {

    const message =
        document.createElement("div");


    message.classList.add(
        "message",
        "firebase-message"
    );


    const avatar =
        document.createElement("div");


    avatar.className =
        "avatar";


    avatar.textContent =
        getInitials(
            data.nome || "Usuário"
        );


    const content =
        document.createElement("div");


    content.className =
        "message-content";


    const info =
        document.createElement("div");


    info.className =
        "message-info";


    const username =
        document.createElement("strong");


    username.textContent =
        data.nome || "Usuário";


    const time =
        document.createElement("span");


    time.textContent =
        formatTime(data.data);


    info.appendChild(username);

    info.appendChild(time);


    content.appendChild(info);


    // ======================================================
    // FIGURINHA
    // ======================================================

    if (data.tipo === "sticker") {

        const sticker =
            document.createElement("div");


        sticker.className =
            "sent-sticker";


        sticker.textContent =
            data.mensagem;


        content.appendChild(sticker);

    }

    // ======================================================
    // TEXTO
    // ======================================================

    else {

        const paragraph =
            document.createElement("p");


        paragraph.textContent =
            data.mensagem;


        content.appendChild(paragraph);

    }


    message.appendChild(avatar);

    message.appendChild(content);


    messagesContainer.appendChild(
        message
    );

}


// ==========================================================
// OUVIR FIRESTORE EM TEMPO REAL
// ==========================================================

let unsubscribeMessages = null;


function loadMessages() {

    if (unsubscribeMessages) {

        unsubscribeMessages();

    }


    const mensagensRef =
        collection(
            db,
            "mensagens"
        );


    const mensagensQuery =
        query(
            mensagensRef,
            orderBy("data", "asc")
        );


    unsubscribeMessages =
        onSnapshot(

            mensagensQuery,

            (snapshot) => {

                clearFirebaseMessages();


                snapshot.forEach(
                    documentSnapshot => {

                        renderMessage(
                            documentSnapshot.data()
                        );

                    }
                );


                scrollToBottom();

            },

            (error) => {

                console.error(
                    "Erro ao carregar mensagens:",
                    error
                );

            }

        );

}


// ==========================================================
// SALVAR TEXTO NO FIRESTORE
// ==========================================================

async function sendMessage() {

    if (!currentUser) {

        alert(
            "Você precisa estar logado para enviar mensagens."
        );

        return;

    }


    const text =
        messageInput.value.trim();


    if (!text) {

        return;

    }


    try {

        await addDoc(

            collection(
                db,
                "mensagens"
            ),

            {

                nome:
                    getUserName(),

                mensagem:
                    text,

                tipo:
                    "texto",

                uid:
                    currentUser.uid,

                data:
                    serverTimestamp()

            }

        );


        messageInput.value = "";

        messageInput.focus();

    }

    catch (error) {

        console.error(
            "Erro ao enviar mensagem:",
            error
        );


        alert(
            "Não foi possível enviar a mensagem."
        );

    }

}


// ==========================================================
// BOTÃO ENVIAR
// ==========================================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ==========================================================
// ENTER
// ==========================================================

messageInput.addEventListener(

    "keydown",

    (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }

);


// ==========================================================
// EMOJIS
// ==========================================================

const emojis = [

    "😂",
    "🔥",
    "💜",
    "👾",
    "☕",
    "💻",
    "🤨",
    "💀",
    "👏",
    "😎",
    "🫡",
    "🤣"

];


let emojiIndex = 0;


emojiButton.addEventListener(

    "click",

    () => {

        if (!currentUser) {

            return;

        }


        messageInput.value +=
            emojis[emojiIndex];


        emojiIndex++;


        if (
            emojiIndex >=
            emojis.length
        ) {

            emojiIndex = 0;

        }


        messageInput.focus();

    }

);


// ==========================================================
// ABRIR FIGURINHAS
// ==========================================================

openStickers.addEventListener(

    "click",

    () => {

        if (!currentUser) {

            return;

        }


        stickerPanel.classList.toggle(
            "open"
        );

    }

);


// ==========================================================
// FECHAR FIGURINHAS
// ==========================================================

closeStickers.addEventListener(

    "click",

    () => {

        stickerPanel.classList.remove(
            "open"
        );

    }

);


// ==========================================================
// SALVAR FIGURINHA NO FIRESTORE
// ==========================================================

async function sendSticker(text) {

    if (!currentUser) {

        return;

    }


    try {

        await addDoc(

            collection(
                db,
                "mensagens"
            ),

            {

                nome:
                    getUserName(),

                mensagem:
                    text,

                tipo:
                    "sticker",

                uid:
                    currentUser.uid,

                data:
                    serverTimestamp()

            }

        );

    }

    catch (error) {

        console.error(
            "Erro ao enviar figurinha:",
            error
        );


        alert(
            "Não foi possível enviar a figurinha."
        );

    }

}


// ==========================================================
// CLIQUE NAS FIGURINHAS
// ==========================================================

stickers.forEach(

    sticker => {

        sticker.addEventListener(

            "click",

            () => {

                const text =
                    sticker.dataset.sticker ||
                    sticker.textContent.trim();


                sendSticker(text);


                stickerPanel.classList.remove(
                    "open"
                );

            }

        );

    }

);


// ==========================================================
// ESTADO INICIAL
// ==========================================================

messageInput.disabled = true;

sendButton.disabled = true;

emojiButton.disabled = true;

openStickers.disabled = true;


messageInput.placeholder =
    "Verificando login...";

// ==========================================
// ENTRAR / SAIR
// ==========================================

authButton.addEventListener(
    "click",

    async () => {

        if (currentUser) {

            try {

                await signOut(auth);

                window.location.reload();

            }

            catch (error) {

                console.error(
                    "Erro ao sair:",
                    error
                );

            }

        }

        else {

            window.location.href =
                "login.html";

        }

    }
);
console.log(
    "Gabriel Tech // Firebase iniciado."
);