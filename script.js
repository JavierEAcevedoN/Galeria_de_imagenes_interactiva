const agregarBtn = document.getElementById("agregar_boton");
agregarBtn.addEventListener("click", () => {
    const imgLink = document.getElementById("agregar_link").value;
    const imgTitle = document.getElementById("agregar_titulo").value;
    const imgDes = document.getElementById("agregar_descripcion").value;
    const contenedor = document.getElementById("contenedor_galeria_imagenes")
    if (
        !/https?:\/{2}([a-zA-Z0-9-]+\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,6}.*/.test(
            imgLink
        )
    ) {
        alert("Tienes que ingresar un link");
        return;
    }
    if (!imgTitle || imgTitle.length > 30) {
        alert("Tienes que ingresar el titulo (max 30)");
        return;
    }
    if (!imgDes || imgDes.length > 210) {
        alert("Tienes que ingresar la descripcion (max 210)");
        return;
    }
    const newDiv = document.createElement("div");
    newDiv.className = "contenedor_galeria";
    for (let i = 0; i < contenedor.children.length; i++) {
        if (contenedor.children[i].style.transform === "scale(1.3)") {
            newDiv.style.transform = "scale(0.7)"
            break;
        }
    }
    newDiv.innerHTML = `
        <img
            class="contenedor_galeria_imagen"
            src=${imgLink}
            alt=${imgTitle}
        />
        <h3 class="contenedor_galeria_titulo">${imgTitle}</h3>
        <p
            class="contenedor_galeria_descripcion"
            style="display: none"
        >
            ${imgDes}
        </p>
        <div class="contenedor_galeria_botones">
            <button
                class="mostar_descripcion"
                onclick="mostarDescripcion(event)"
            >
                Alternar descripción
            </button>
            <button
                class="eliminar_imagen"
                onclick="eliminarImagen(event)"
            >
                Eliminar imagen
            </button>
        </div>
    `;
    contenedor.appendChild(newDiv);
});
const mostarDescripcion = (event) => {
    const elemento = event.target.parentElement.parentElement;
    const elementosHermanos = elemento.parentElement.children;
    const descripcionToggle = elemento.children[2];
    

    if (descripcionToggle.style.display !== "block") {
        if (elemento.style.transform !== "scale(1)") {
            for (let i = 0; i < elementosHermanos.length; i++) {
                elementosHermanos[i].style.transform = "scale(0.7)";
                elementosHermanos[i].children[2].style.display = "none";
            }
            elemento.style.transform = "scale(1.3)";
            descripcionToggle.style.display = "block";
        }
        for (let i = 0; i < elementosHermanos.length; i++) {
            elementosHermanos[i].style.transform = "scale(0.7)";
        }
        elemento.style.transform = "scale(1.3)";
        descripcionToggle.style.display = "block";
    } else {
        for (let i = 0; i < elementosHermanos.length; i++) {
            elementosHermanos[i].style.transform = "scale(1)";
        }
        descripcionToggle.style.display = "none";
    }
};
const eliminarImagen = (event) => {
    const contenedorImagen = event.target.parentElement.parentElement;
    const elementosHermanos = contenedorImagen.parentElement.children;
    contenedorImagen.parentElement.removeChild(contenedorImagen);
    for (let i = 0; i < elementosHermanos.length; i++) {
        elementosHermanos[i].style.transform = "scale(1)";
        elementosHermanos[i].children[2].style.display = "none";
    }
};