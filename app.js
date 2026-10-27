
const boton = document.getElementById("buscar");
const entrada = document.getElementById("busqueda");
const contenedor = document.getElementById("usuarios");
const mensaje = document.getElementById("mensaje");

let usuarios = [];

async function cargarUsuarios() {
    try {
        mensaje.textContent = "Cargando usuarios...";

        const response = await fetch("https://randomuser.me/api/?results=6");

        if (!response.ok) {
            throw new Error("Error al cargar usuarios");
        }

        const data = await response.json();
        usuarios = data.results;

        mostrarUsuarios(usuarios);
        mensaje.textContent = "Usuarios cargados: " + usuarios.length;

    } catch (error) {
        mensaje.textContent = "Error al cargar los usuarios.";
    }
}

function mostrarUsuarios(lista) {
    contenedor.innerHTML = "";

    lista.forEach(usuario => {
        contenedor.innerHTML += `
            <div class="tarjeta">
                <img src="${usuario.picture.large}" alt="Foto">
                <h3>${usuario.name.first} ${usuario.name.last}</h3>
                <p>Correo: ${usuario.email}</p>
                <p>Teléfono: ${usuario.phone}</p>
                <p>País: ${usuario.location.country}</p>
            </div>
        `;
    });

    if (lista.length === 0) {
        mensaje.textContent = "No se encontraron usuarios.";
    } else {
        mensaje.textContent = "Usuarios encontrados: " + lista.length;
    }
}

boton.addEventListener("click", function () {
    const texto = entrada.value.toLowerCase().trim();

    const filtrados = usuarios.filter(usuario => {
        const nombre = usuario.name.first + " " + usuario.name.last;
        return nombre.toLowerCase().includes(texto);
    });

    mostrarUsuarios(filtrados);
});

cargarUsuarios();
