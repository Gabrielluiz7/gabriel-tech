// ==========================================
// GABRIEL TECH // FÓRUM
// CHAT LOCAL
// ==========================================


// ==========================================
// ELEMENTOS
// ==========================================

const messagesContainer =
    document.getElementById("messages");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const emojiButton =
    document.getElementById("emojiButton");


// ==========================================
// PEGAR HORÁRIO ATUAL
// ==========================================

function getCurrentTime() {

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    return `${hours}:${minutes}`;

}


// ==========================================
// CRIAR MENSAGEM
// ==========================================

function createMessage(text) {

    const message =
        document.createElement("div");

    message.classList.add("message");


    message.innerHTML = `

        <div class="avatar">
            EU
        </div>

        <div class="message-content">

            <div class="message-info">

                <strong>
                    Você
                </strong>

                <span>
                    ${getCurrentTime()}
                </span>

            </div>

            <p></p>

        </div>

    `;


    /*
    Colocamos o texto usando textContent
    para evitar HTML sendo injetado
    dentro da mensagem.
    */

    const paragraph =
        message.querySelector("p");

    paragraph.textContent =
        text;


    return message;

}


// ==========================================
// ENVIAR MENSAGEM
// ==========================================

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (text === "") {
        return;
    }


    const message =
        createMessage(text);


    messagesContainer.appendChild(
        message
    );


    messageInput.value = "";


    /*
    Rolagem automática
    para a mensagem mais nova.
    */

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;


    messageInput.focus();

}


// ==========================================
// BOTÃO ENVIAR
// ==========================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ==========================================
// ENTER PARA ENVIAR
// ==========================================

messageInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);


// ==========================================
// EMOJIS SIMPLES
// ==========================================

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
    "😎"
];

let emojiIndex = 0;


emojiButton.addEventListener(
    "click",
    () => {

        const emoji =
            emojis[emojiIndex];


        messageInput.value +=
            emoji;


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


// ==========================================
// COMEÇAR NO FINAL DO CHAT
// ==========================================

window.addEventListener(
    "load",
    () => {

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;

        messageInput.focus();

    }
);