// URL base de la API de Rick y Morty
const API_URL = "https://rickandmortyapi.com/api/character";

// Referencias al DOM
const tablaBody = document.querySelector("#tablaPersonajes tbody");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modal = new bootstrap.Modal(document.getElementById("modalPersonaje"));

// traducciones
const traducciones = {
    "Alive": "Vivo",
    "Dead": "Muerto",
    "unknown": "Desconocido",
    "Human": "Humano",
    "Alien": "Alienígena"
}

function traducir(texto) {
    return traducciones[texto] || texto;
}

// Función para cargar personajes
async function cargarPersonajes() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();

        tablaBody.innerHTML = "";

        datos.results.forEach(personaje => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
        <td>${personaje.name}</td>
        <td>${traducir(personaje.species)}</td>
        <td>${traducir(personaje.status)}</td>
        <td>
          <button class="btn btn-warning btn-sm" data-id="${personaje.id}">
            Ver detalles
          </button>
        </td>
      `;

            fila.querySelector("button").addEventListener("click", () => mostrarDetalles(personaje.id));

            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar personajes:", error);
    }
}

// Función el modal
async function mostrarDetalles(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        const personaje = await respuesta.json();

        modalTitle.textContent = personaje.name;
        modalContent.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid rounded mb-3">
      <p><strong>Especie:</strong> ${traducir(personaje.species)}</p>
      <p><strong>Estado:</strong> ${traducir(personaje.status)}</p>
      <p><strong>Origen:</strong> ${(personaje.origin.name)}</p>
      <p><strong>Ubicación:</strong> ${(personaje.location.name)}</p>
    `;

        modal.show();
    } catch (error) {
        console.error("Error al mostrar detalles:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarPersonajes);
