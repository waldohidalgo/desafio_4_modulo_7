const urlGet = "/canciones";
const url = "/cancion";

let tbody = document.getElementById("cuerpo");
let cancion = document.getElementById("titulo");
let artista = document.getElementById("artista");
let tono = document.getElementById("tono");
const formulario = document.getElementById("form_agregar_editar");

let canciones = [];

window.onload = function () {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const formularioData = new FormData(formulario);
    const data = Object.fromEntries(formularioData);
    nuevaCancion(data);
  });

  getData();
};
async function getData() {
  await axios.get(urlGet).then((data) => {
    canciones = data.data.sort((a, b) => a.id - b.id);
    tbody.innerHTML = "";
    canciones.forEach((c, index) => {
      tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${c.titulo}</td>
        <td>${c.artista}</td>
        <td>${c.tono}</td>
        <td class="contenedor_btns_canciones">
          <button class="btn btn-warning" onclick="prepararCancion(${index},'${
        c.id
      }')">Editar</button>
          <button class="btn btn-danger" onclick="eliminarCancion(${index},'${
        c.id
      }')">Eliminar</button>
        </td>
      </tr>
    `;
    });
  });
  cancion.value = "";
  artista.value = "";
  tono.value = "";
}

async function nuevaCancion(data) {
  try {
    const resultado = await axios.post(url, formulario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resultado.status === 200) {
      getData();
    } else {
      throw new Error("Error al agregar la cancion");
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

async function eliminarCancion(index, id) {
  try {
    const response = await axios.delete(url + "?id=" + id);
    if (response.status === 200) {
      const indice = index + 1;
      const titulo = response.data[0].titulo;
      alert("Canción de ID: " + indice + " de Titulo:" + titulo + " eliminada");
      getData();
    } else {
      throw new Error("Error al eliminar la cancion");
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function prepararCancion(i, id) {
  cancion.value = canciones[i].titulo;
  artista.value = canciones[i].artista;
  tono.value = canciones[i].tono;
  document
    .getElementById("editar")
    .setAttribute("onclick", `editarCancion('${id}')`);
  document.getElementById("agregar").style.display = "none";
  document.getElementById("agregar").disabled = true;
  document.getElementById("editar").style.display = "block";
}

async function editarCancion(id) {
  if (cancion.value == "" || artista.value == "" || tono.value == "") {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (id) {
    try {
      const response = await axios.put(url + "/" + id, formulario, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        getData();

        document.getElementById("agregar").style.display = "block";
        document.getElementById("agregar").disabled = false;
        document.getElementById("editar").style.display = "none";
      } else {
        throw new Error("Error al editar la cancion");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Debes seleccionar una cancion de la lista de abajo para editarla");
  }
}
