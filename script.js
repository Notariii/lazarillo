const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let stabledConexion = 0; // Controla si ya se realizó la conexión a la API

function conectarApi(dato) {
  if (stabledConexion === 0) {
    console.log("Se presionó el botón por primera vez");

    const loginData = {
      email: "diegosebastianalbo@gmail.com",
      pass: "Mantenimiento2022",
      cod_cli: "14536",
    };
    if(dato == 'menu'){

      // Realizar la solicitud POST para autenticación
    fetch("https://api-mconn.maxisistemas.com.ar/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.resultCode === "SUCCESS") {
          console.log(data.content.tokenAccess);
          bajarDatos(data.content.tokenAccess); // Llamar a la función para obtener los datos
        } else {
          console.log("Error en la autenticación");
          console.log(data.resultDescription);
        }
      })
      .catch((error) => {
        console.error("Error al conectarse con la API:", error);
      });

    }
    
    stabledConexion += 1; // Marcar como conectado
  } else {
    console.log("El botón ya se presionó.");
  }
}

function bajarDatos(keyToken) {
  fetch("https://api-mconn.maxisistemas.com.ar/menuweb/menuextendido", {
    method: "GET",
    headers: { Authorization: "Bearer " + keyToken },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json); // Para inspeccionar la respuesta completa
      const data = json.content; // Array de rubros
      let tableBody = document.getElementById("tabla-body");

      // Limpiar el contenido previo de la tabla
      tableBody.innerHTML = "";

      // Recorrer cada rubro
      data.forEach((rubro) => {
    
        // También verificar los subrubros
        if (rubro.subrubros && rubro.subrubros.length > 0) {
          rubro.subrubros.forEach((subrubro) => {
            // Recorrer los artículos de cada subrubro
            if (subrubro.articulos && subrubro.articulos.length > 0) {
              subrubro.articulos.forEach((articulo) => {
                let row = document.createElement("tr");

                // Crear filas con los datos de los artículos
                row.innerHTML = `
                  <td>${articulo.id}</td>
                  <td>${articulo.nombre}</td>
                  <td>${articulo.precio}</td>
                  <td id="venta-competencia-${articulo.id}">--</td>
                  <td id="costo-${articulo.id}">---</td>
                  <td id="porc-costo-${articulo.id}">--</td>
                  <td id="porc-objetivo-${articulo.id}">--</td>
                  <td id="porc-sugerido-${articulo.id}">--</td>
                  <td><input type="number" placeholder="$ Manual" class="form-control"  id="precio-manual-${articulo.id}"></td>
                  <td id="ventas-${articulo.id}">--</td>
                  <td id="ganancia-${articulo.id}">--</td>
                  <td id="lista-${articulo.id}">--</td>
                  <td id="off-10-${articulo.id}">--</td>
                  <td id="off-20-${articulo.id}">--</td>
                  <td id="off-2x1-${articulo.id}">--</td>
                `;
                tableBody.appendChild(row);

                // Listeners para cálculos automáticos cuando se ingresan valores
              });
            }
          });
        }
      });
    })
    .catch((err) => console.log(err));
}


// Llamada inicial para conectar a la API cuando el usuario presiona el botón