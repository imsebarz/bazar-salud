const loginCircle = document.querySelector(".login");
const html = document.querySelector("html");
const body = document.querySelector("body");
const mainContent = document.querySelector(".main-content");
const iframes = document.querySelectorAll("iframe");
const srcs = {
  deportes: `${iframes[2].src}`,
  seno: `${iframes[1].src}`,
  origami: `${iframes[0].src}`,
};
const tarjetasContainer = document.querySelector(".tarjetas-container");
const adiccionesContainer = document.querySelector(
  ".juego-container.adicciones"
);
const odontologiaContainer = document.querySelector(
  ".juego-container.odontologia"
);
const musicaContainer = document.querySelector(".juego-container.musica");
const deportesContainer = document.querySelector(".juego-container.deportes");
const socialContainer = document.querySelector(".juego-container.social");
const autoexamenContainer = document.querySelector(
  ".juego-container.autoexamen"
);
const emocionesContainer = document.querySelector(".juego-container.emociones");
const bucaramangaContainer = document.querySelector(
  ".juego-container.sede-bucaramanga"
);
const donacionContainer = document.querySelector(".juego-container.donacion");
const palmiraContainer = document.querySelector(
  ".juego-container.sede-palmira"
);
const diversidadContainer = document.querySelector(
  ".juego-container.diversidad"
);
const tarjetasInicio = document.querySelectorAll(".tarjeta.inicio");
const tarjetasAdicciones = document.querySelectorAll(
  ".juego-container.adicciones .tarjeta"
);
const tarjetasOdontologia = document.querySelectorAll(
  ".juego-container.odontologia .tarjeta"
);
const buttonLogin = document.querySelector(".login button");
const coloresEmocionometro = document.querySelectorAll(
  "#EMOCIONOMETRO-01 .color"
);
const tarjetaEmocionometro = document.querySelector(".emociones .tarjeta");
const loadingLogin = document.querySelector(".login svg");
const nombre = document.querySelector("input[name='Nombre']");
const form = document.forms["submit-to-google-sheet"];
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzb38hDPVfFHx-YwKSliCbJGwMrKC8SlbqgClt_Hsc8Z77w9Iyz/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  buttonLogin.style.display = "none";
  loadingLogin.style.display = "flex";
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      swal
        .fire(
          `Hola ${nombre.value}`,
          "Bienvenido al bazar de la salud",
          "success"
        )
        .then(() => cerrarLogin());
    })
    .catch((error) =>
      console.error("Error al procesar la solicitud", error.message)
    );
});

let mySwiper1 = new Swiper(".swiper-container.s1", {
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    color: "red",
  },
});

let mySwiper2 = new Swiper(".swiper-container.s2", {
  observer: true,
  observeParents: true,
  calculateHeight: true,
  autoHeight: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    color: "red",
  },
});

const cerrarLogin = () => {
  loginCircle.classList.add("hide");
  loginCircle.innerHTML = `<i class="fas fa-home"></i>`;
  mostrarInicio();
  loginCircle.addEventListener("click", mostrarInicio);
};

const mostrarInicio = () => {
  cerrarTodo();
  mostrar(tarjetasContainer);
  body.style.background = "rgb(245,238, 220)";
};

const cerrarTodo = () => {
  tarjetasContainer.style.display = "none";
  odontologiaContainer.style.display = "none";
  adiccionesContainer.style.display = "none";
  musicaContainer.style.display = "none";
  emocionesContainer.style.display = "none";
  diversidadContainer.style.display = "none";
  socialContainer.style.display = "none";
  autoexamenContainer.style.display = "none";
  deportesContainer.style.display = "none";
  donacionContainer.style.display = "none";
  bucaramangaContainer.style.display = "none";
  palmiraContainer.style.display = "none";
  cerrarIframes();
};

const cerrarIframes = () => {
  iframes.forEach((iframe) => (iframe.src = `${iframe.src}`));
};

const mostrar = (juego) => {
  body.scrollIntoView(top);
  juego.style.display = "flex";
};

const mostrarJuego = (e) => {
  let juego = e.target.parentElement.dataset.id;
  cerrarTodo();
  if (juego === "adicciones") {
    body.style.background = "white";
    mostrar(adiccionesContainer);
  } else if (juego === "odontologia") {
    body.style.background = "white";
    mostrar(odontologiaContainer);
  } else if (juego === "musica") {
    mostrar(musicaContainer);
  } else if (juego === "emociones") {
    mostrar(emocionesContainer);
  } else if (juego === "diversidad") {
    body.style.background = "white";
    mostrar(diversidadContainer);
  } else if (juego === "social") {
    mostrar(socialContainer);
  } else if (juego === "autoexamen") {
    mostrar(autoexamenContainer);
  } else if (juego === "deportes") {
    mostrar(deportesContainer);
  } else if (juego === "donacion") {
    mostrar(donacionContainer);
  } else if (juego === "sede-bucaramanga") {
    mostrar(bucaramangaContainer);
  } else if (juego === "sede-palmira") {
    mostrar(palmiraContainer);
  }
};

tarjetasInicio.forEach((el) =>
  el.addEventListener("click", (e) => mostrarJuego(e))
);

const rotarTarjeta = (tarjeta) => {
  tarjeta.classList.toggle("rotated");
};

const rotables = [...tarjetasAdicciones, ...tarjetasOdontologia];

rotables.forEach((tarjeta) =>
  tarjeta.addEventListener("click", () => rotarTarjeta(tarjeta))
);

coloresEmocionometro.forEach((color) => {
  color.addEventListener("", (color) => {
    // color.style.fill;
  });
  color.addEventListener("click", () => {
    mostrarColor(color.id);
  });
});

const mostrarColor = (color) => {
  tarjetaEmocionometro.innerHTML = `<img src="./images/emociones/${color}.png" alt="emocion ${color}" />`;
  tarjetaEmocionometro.style.display = "block";
  body.style.background = "rgb(156,149,132)";
  mainContent.addEventListener("click", (e) => {
    if (!e.target.classList.contains("color")) {
      cerrarColor();
    }
  });
};

const cerrarColor = () => {
  tarjetaEmocionometro.style.display = "none";
  body.style.background = "rgb(245, 238, 220)";
};
