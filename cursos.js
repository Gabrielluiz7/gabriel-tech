const aulas = [
    {
        numero: "AULA 01",
        titulo: "INTRODUÇÃO",
        video: "videos/aula1.mp4"
    },

    {
        numero: "AULA 02",
        titulo: "REDES",
        video: "videos/aula2.mp4"
    },

    {
        numero: "AULA 03",
        titulo: "IP, MÁSCARA E GATEWAY",
        video: "videos/aula3.mp4"
    },

    {
        numero: "AULA 04",
        titulo: "DNS E DHCP",
        video: "videos/aula4.mp4"
    }
];

let aulaAtual = 0;

const video = document.getElementById("courseVideo");
const numeroAula = document.querySelector(".lesson-info span");
const tituloAula = document.querySelector(".lesson-info h2");
const botaoProxima = document.getElementById("nextLesson");

botaoProxima.addEventListener("click", () => {

    if (aulaAtual < aulas.length - 1) {

        aulaAtual++;

        const aula = aulas[aulaAtual];

        video.src = aula.video;

        numeroAula.textContent = aula.numero;
        tituloAula.textContent = aula.titulo;

        video.load();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        botaoProxima.textContent = "CURSO CONCLUÍDO ✓";
        botaoProxima.disabled = true;

    }

});