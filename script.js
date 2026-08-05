// ================================
// GABRIEL TECH
// script.js
// ================================

// Mensagem no console

console.log("Gabriel Tech Initialized");

// -------------------------------
// Efeito de digitação
// -------------------------------

const titulo = document.querySelector(".texto h1");

const frase = `FOCUS.
PERSIST.
NEVER GIVE UP.`;

titulo.innerHTML = "";

let i = 0;

function escrever() {

    if (i < frase.length) {

        titulo.innerHTML += frase.charAt(i);

        i++;

        setTimeout(escrever, 60);

    }

}

window.onload = escrever;


// -------------------------------
// Fade dos elementos
// -------------------------------

const elementos = document.querySelectorAll(".card,.motivation,.gif,.texto,.imagem");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("mostrar");

}

});

});

elementos.forEach(el=>{

observer.observe(el);

});


// -------------------------------
// Brilho seguindo o mouse
// -------------------------------

document.addEventListener("mousemove",(e)=>{

const x=e.clientX;
const y=e.clientY;

document.body.style.background=
`radial-gradient(circle at ${x}px ${y}px,
rgba(120,30,255,.10),
#050505 45%)`;

});


// -------------------------------
// Pequeno efeito no botão
// -------------------------------

const botao=document.querySelector(".botao");

botao.addEventListener("mouseenter",()=>{

botao.style.boxShadow="0 0 60px #9d4dff";

});

botao.addEventListener("mouseleave",()=>{

botao.style.boxShadow="0 0 25px #7b2cff";

});


// -------------------------------
// Mensagem inicial
// -------------------------------

setTimeout(()=>{

console.log("Welcome to Gabriel Tech.");

},1000);