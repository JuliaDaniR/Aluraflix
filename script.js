let listaPeliculas = obtenerLista("listaPeliculas", []);
let listaNombresPeliculas = obtenerLista("listaNombresPeliculas", []);
let listaEnlacesTrailer = obtenerLista("listaEnlacesTrailer", []);

let listaCanciones = obtenerLista("listaCanciones", []);
let listaNombresCanciones = obtenerLista("listaNombresCanciones", []);
let listaEnlacesCanciones = obtenerLista("listaEnlacesCanciones", []);

let listaLibros = obtenerLista("listaLibros", []);
let listaNombresLibros = obtenerLista("listaNombresLibros", []);
let listaEnlacesLibros = obtenerLista("listaEnlacesLibros", []);

let listaCursos = obtenerLista("listaCursos", []);
let listaNombresCursos = obtenerLista("listaNombresCursos", []);
let listaEnlacesCursos = obtenerLista("listaEnlacesCursos", []);

function obtenerLista(nombreLista, valorDefault) {
  return JSON.parse(localStorage.getItem(nombreLista)) || valorDefault;
}

// Función para mostrar contenido genérico
function mostrarContenido(
  tituloContenido,
  listaItems,
  listaNombresItems,
  listaEnlacesItems
) {
  const titulo = document.querySelector(".titulo");
  titulo.innerHTML = tituloContenido;

  const containerContenido = document.querySelector(".container-contenido");
  const containerAgregarContenido = document.querySelector(
    ".containerAgregarContenido"
  );
  const exito = document.querySelector(".exito");
  let mensajeUsuario = "";
  let agregarContenidoHTML = "";

  function renderizarContenido() {
    let campoContenidoHTML = "";
    for (let i = 0; i < listaItems.length; i++) {
      campoContenidoHTML += `
        <div class="item">
        <div class="container-eliminar">
          <span class="eliminar-item" data-indice="${i}">
            <i class="fas fa-trash-alt"></i>
          </span>
          </div>
          <div class="container-imagen">
          <a href="${listaEnlacesItems[i]}" target="_blank">
            <img src="${listaItems[i]}" alt="${listaNombresItems[i]}"></img>
            <h2>${listaNombresItems[i]}</h2>
          </a>
          </div>
        </div>
      `;
    }
    containerContenido.innerHTML = campoContenidoHTML;
  }

  function handleClickEnEliminar(event) {
    if (event.target.classList.contains("fa-trash-alt")) {
      let indice = event.target.parentNode.dataset.indice;
      eliminarItem(indice);
    }
  }

  function eliminarItem(indice) {
    listaItems.splice(indice, 1);
    listaNombresItems.splice(indice, 1);
    listaEnlacesItems.splice(indice, 1);
    renderizarContenido();
    actualizarLocalStorage(
      "listaPeliculas",
      listaPeliculas,
      listaNombresPeliculas,
      listaEnlacesTrailer
    );
    actualizarLocalStorage(
      "listaCanciones",
      listaCanciones,
      listaNombresCanciones,
      listaEnlacesCanciones
    );
    actualizarLocalStorage("listaLibros", listaLibros, listaNombresLibros, listaEnlacesLibros);
    actualizarLocalStorage("listaCursos", listaCursos, listaNombresCursos, listaEnlacesCursos);
    
  }

  function actualizarLocalStorage(nombreLista, listaItems, listaNombresItems, listaEnlacesItems) {
    localStorage.setItem(nombreLista, JSON.stringify(listaItems));
    localStorage.setItem(nombreLista + "Nombres", JSON.stringify(listaNombresItems));
    localStorage.setItem(nombreLista + "Enlaces", JSON.stringify(listaEnlacesItems));
  }

  function handleClickEnAgregar() {
    let urlNuevoItem = document.getElementById("urlItem").value;
    let nombreNuevoItem = document.getElementById("nombreItem").value;
    let enlaceItem = document.getElementById("enlaceItem").value;
    let mensajeUsuario = "";
  
    // Expresión regular para validar que la URL termine con una extensión de imagen
    const regex = /\.(jpg|jpeg|png|gif)$/i;
  
    if (
      listaItems.includes(urlNuevoItem) ||
      listaNombresItems.includes(nombreNuevoItem) ||
      listaEnlacesItems.includes(enlaceItem)
    ) {
      mensajeUsuario = `
        <h3 style="border: 2px solid darkred; display: inline; padding: 1rem; border-radius: 10px;"> 🔥El elemento ya está en tu lista 🔥</h3>
      `;
    } else if (
      urlNuevoItem == "" ||
      nombreNuevoItem == "" ||
      enlaceItem == ""
    ) {
      mensajeUsuario = `
        <h3 style="border: 2px solid darkred; display: inline; padding: 1rem; border-radius: 10px;">Todos los campos deben estar completos 😢</h3>
      `;
    } else if (!regex.test(urlNuevoItem)) {
      mensajeUsuario = `
        <h3 style="border: 2px solid darkred; display: inline; padding: 1rem; border-radius: 10px;">La URL debe ser una imagen válida (jpg, jpeg, png, gif) 😢</h3>
      `;
    } else {
      listaItems.push(urlNuevoItem);
      listaNombresItems.push(nombreNuevoItem);
      listaEnlacesItems.push(enlaceItem);
  
      renderizarContenido();
      actualizarLocalStorage(
        "listaPeliculas",
        listaPeliculas,
        listaNombresPeliculas,
        listaEnlacesTrailer
      );
      actualizarLocalStorage(
        "listaCanciones",
        listaCanciones,
        listaNombresCanciones,
        listaEnlacesCanciones
      );
      actualizarLocalStorage(
        "listaLibros",
        listaLibros,
        listaNombresLibros,
        listaEnlacesLibros
      );
      actualizarLocalStorage(
        "listaCursos",
        listaCursos,
        listaNombresCursos,
        listaEnlacesCursos
      );
  
      mensajeUsuario = `
        <h3 style="border: 2px solid darkgreen; display: inline; padding: 1rem; border-radius: 10px;">😊 Elemento guardado con éxito 😊</h3>
      `;
    }
  
    exito.innerHTML = mensajeUsuario;
  
    setTimeout(() => {
      document.getElementById("urlItem").value = "";
      document.getElementById("nombreItem").value = "";
      document.getElementById("enlaceItem").value = "";
      exito.innerHTML = "";
    }, 5000);
  }
  

  agregarContenidoHTML += `
    <label for="urlItem">Ingresa la URL de la imagen</label><br />
    <input class="urlItem" id="urlItem" type="text" name="url"/><br />
    <label for="nombreItem">Ingresa el nombre</label><br />
    <input class="nombreItem" id="nombreItem" type="text" name="nombre"/><br />
    <label for="enlaceItem">Enlace video o descargar info</label><br />
    <input class="enlaceItem" id="enlaceItem" type="text" name="enlace"/><br />
    <button type="button" id="btn-agregar">Agregar</button>
  `;

  containerAgregarContenido.innerHTML = agregarContenidoHTML;

  containerContenido.addEventListener("click", handleClickEnEliminar);
  document
    .getElementById("btn-agregar")
    .addEventListener("click", handleClickEnAgregar);

  renderizarContenido();
}

// Llamada para mostrar películas
document.querySelector(".peliculas").addEventListener("click", () => {
  mostrarContenido(
    "🍿🎬 Lista de películas favoritas 🎬 🍿",
    listaPeliculas,
    listaNombresPeliculas,
    listaEnlacesTrailer
  );
});

// Llamada para mostrar música
document.querySelector(".musica").addEventListener("click", () => {
  mostrarContenido(
    "🎵 Lista de canciones favoritas 🎵",
    listaCanciones,
    listaNombresCanciones,
    listaEnlacesCanciones
  );
});

// Llamada para mostrar libros
document.querySelector(".libros").addEventListener("click", () => {
  mostrarContenido(
    "📚 Lista de libros favoritos 📚",
    listaLibros,
    listaNombresLibros,
    listaEnlacesLibros
  );
});

document.querySelector(".cursos").addEventListener("click", () => {
  // Llamada para mostrar cursos de programación
  mostrarContenido(
    "👨‍💻 Lista de cursos de programación 📚",
    listaCursos,
    listaNombresCursos,
    listaEnlacesCursos
  );
});
