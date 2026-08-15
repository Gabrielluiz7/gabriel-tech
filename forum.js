// ==========================================================
// GABRIEL TECH // FÓRUM
// CHAT + EMOJIS + FIGURINHAS
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // ELEMENTOS
    // ======================================================

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


    // ======================================================
    // VERIFICAÇÃO
    // ======================================================

    if (
        !messagesContainer ||
        !messageInput ||
        !sendButton
    ) {

        console.error(
            "Gabriel Tech: elementos do chat não encontrados."
        );

        return;
    }


    // ======================================================
    // HORÁRIO
    // ======================================================

    function getCurrentTime() {

        const now = new Date();

        const hours =
            String(now.getHours())
            .padStart(2, "0");

        const minutes =
            String(now.getMinutes())
            .padStart(2, "0");

        return `${hours}:${minutes}`;
    }


    // ======================================================
    // ROLAR CHAT PARA O FINAL
    // ======================================================

    function scrollToBottom() {

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;
    }


    // ======================================================
    // CRIAR MENSAGEM NORMAL
    // ======================================================

    function createMessage(text) {

        const message =
            document.createElement("div");

        message.className =
            "message";


        const avatar =
            document.createElement("div");

        avatar.className =
            "avatar";

        avatar.textContent =
            "EU";


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
            "Você";


        const time =
            document.createElement("span");

        time.textContent =
            getCurrentTime();


        const paragraph =
            document.createElement("p");

        paragraph.textContent =
            text;


        info.appendChild(username);
        info.appendChild(time);

        content.appendChild(info);
        content.appendChild(paragraph);

        message.appendChild(avatar);
        message.appendChild(content);


        return message;
    }


    // ======================================================
    // ENVIAR MENSAGEM
    // ======================================================

    function sendMessage() {

        const text =
            messageInput.value.trim();


        if (!text) {
            return;
        }


        const message =
            createMessage(text);


        messagesContainer.appendChild(
            message
        );


        messageInput.value = "";


        scrollToBottom();

        messageInput.focus();
    }


    // ======================================================
    // BOTÃO ENVIAR
    // ======================================================

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // ======================================================
    // ENTER
    // ======================================================

    messageInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();
            }

        }
    );


    // ======================================================
    // EMOJIS
    // ======================================================

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


    if (emojiButton) {

        emojiButton.addEventListener(
            "click",
            () => {

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
    }


    // ======================================================
    // ABRIR PAINEL DE FIGURINHAS
    // ======================================================

    if (
        openStickers &&
        stickerPanel
    ) {

        openStickers.addEventListener(
            "click",
            () => {

                stickerPanel.classList.toggle(
                    "open"
                );

            }
        );
    }


    // ======================================================
    // FECHAR PAINEL
    // ======================================================

    if (
        closeStickers &&
        stickerPanel
    ) {

        closeStickers.addEventListener(
            "click",
            () => {

                stickerPanel.classList.remove(
                    "open"
                );

            }
        );
    }


    // ======================================================
    // ENVIAR FIGURINHA
    // ======================================================

    function sendSticker(text) {

        const message =
            document.createElement("div");

        message.className =
            "message";


        const avatar =
            document.createElement("div");

        avatar.className =
            "avatar";

        avatar.textContent =
            "EU";


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
            "Você";


        const time =
            document.createElement("span");

        time.textContent =
            getCurrentTime();


        const sticker =
            document.createElement("div");

        sticker.className =
            "sent-sticker";

        sticker.textContent =
            text;


        info.appendChild(username);
        info.appendChild(time);

        content.appendChild(info);
        content.appendChild(sticker);

        message.appendChild(avatar);
        message.appendChild(content);


        messagesContainer.appendChild(
            message
        );


        scrollToBottom();
    }


    // ======================================================
    // CLIQUE NAS FIGURINHAS
    // ======================================================

    stickers.forEach(
        sticker => {

            sticker.addEventListener(
                "click",
                () => {

                    const stickerText =
                        sticker.dataset.sticker ||
                        sticker.textContent.trim();


                    sendSticker(
                        stickerText
                    );


                    if (stickerPanel) {

                        stickerPanel.classList.remove(
                            "open"
                        );
                    }

                }
            );

        }
    );


    // ======================================================
    // INICIALIZAÇÃO
    // ======================================================

    scrollToBottom();

    messageInput.focus();


    console.log(
        "Gabriel Tech // Chat carregado."
    );

});