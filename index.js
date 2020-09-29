const loginCircle = document.querySelector(".login");
const html = document.querySelector("html");
const body = document.querySelector("body");
const mainContent = document.querySelector(".main-content");
const tarjetasContainer = document.querySelector(".tarjetas-container");
const adiccionesContainer = document.querySelector(
  ".juego-container.adicciones"
);
const odontologiaContainer = document.querySelector(
  ".juego-container.odontologia"
);
const musicaContainer = document.querySelector(".juego-container.musica");
const emocionesContainer = document.querySelector(".juego-container.emociones");
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
      console.log("Success!", response);
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
  console.log("nosfii pal inicio");
};

const cerrarTodo = () => {
  tarjetasContainer.style.display = "none";
  odontologiaContainer.style.display = "none";
  adiccionesContainer.style.display = "none";
  musicaContainer.style.display = "none";
  emocionesContainer.style.display = "none";
};

const mostrar = (juego) => {
  juego.style.display = "flex";
};

const mostrarJuego = (e) => {
  let juego = e.target.parentElement.dataset.id;
  cerrarTodo();
  if (juego === "adicciones") {
    mostrar(adiccionesContainer);
    body.style.background = "white";
  } else if (juego === "odontologia") {
    mostrar(odontologiaContainer);
    body.style.background = "white";
  } else if (juego === "musica") {
    mostrar(musicaContainer);
  } else if (juego === "emociones") {
    mostrar(emocionesContainer);
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
  body.style.background = "rgb(156 149 132)";
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
