const loginCircle = document.querySelector(".login");
const tarjetasContainer = document.querySelector(".tarjetas-container");
const adiccionesContainer = document.querySelector(
  ".juego-container.adicciones"
);
const psicologiaContainer = document.querySelector(
  ".juego-container.psicologia"
);
const tarjetasInicio = document.querySelectorAll(".tarjeta.inicio");
const tarjetasAdicciones = document.querySelectorAll(
  ".juego-container.adicciones .tarjeta"
);
const buttonLogin = document.querySelector(".login button");
const nombre = document.querySelector("input[name='Nombre']");
const form = document.forms["submit-to-google-sheet"];
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzb38hDPVfFHx-YwKSliCbJGwMrKC8SlbqgClt_Hsc8Z77w9Iyz/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();
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
  loginCircle.innerHTML = "Inicio";
  mostrarInicio();
  loginCircle.addEventListener("click", mostrarInicio);
};

const mostrarInicio = () => {
  tarjetasContainer.style.display = "flex";
  adiccionesContainer.style.display = "none";
  psicologiaContainer.style.display = "none";
  console.log("nosfii pal inicio");
};

const mostrarJuego = (e) => {
  let juego = e.target.parentElement.dataset.id;
  if (juego === "adicciones") {
    tarjetasContainer.style.display = "none";
    psicologiaContainer.style.display = "none";
    adiccionesContainer.style.display = "flex";
  } else if (juego === "psicologia") {
    tarjetasContainer.style.display = "none";
    adiccionesContainer.style.display = "none";
    psicologiaContainer.style.display = "flex";
  }
};

tarjetasInicio.forEach((el) =>
  el.addEventListener("click", (e) => mostrarJuego(e))
);

const rotarTarjeta = (tarjeta) => {
  tarjeta.classList.toggle("rotated");
};

tarjetasAdicciones.forEach((tarjeta) =>
  tarjeta.addEventListener("click", () => rotarTarjeta(tarjeta))
);
