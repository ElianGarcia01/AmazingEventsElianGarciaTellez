import * as modulo from '../Modules/Modules.js'

// OBTENER DATOS DE LA API
modulo.obtenerDatos()
  .then(datos => {

    let data = datos

    // URL Search Params
    const urlParams = new URLSearchParams(window.location.search)

    const eventoID = urlParams.get('id')

    const evento = data.events.find(a => a._id === parseInt(eventoID))

    const contenedor = document.getElementById('contenedor')

    let tarjeta = `
      <div class="container details d-flex justify-content-center">
      <div class="card my-5 border border-1 border-dark">
        <div class="row p-5">
          <div class="col-md-6 border border-1 border-dark d-flex">
            <img src="${evento.image}" class="img-fluid rounded-3" alt="${evento.name}">
          </div>
          <div class="col-md-6 border border-1 border-dark">
            <div class="card-body">
              <h5 class="card-title text-center">${evento.name}</h5>
              <br>
              <p class="card-text"><span class="fw-bold">Date:</span> ${evento.date}</p>
              <p class="card-text"><span class="fw-bold">Description:</span> ${evento.description}</p>
              <p class="card-text"><span class="fw-bold">Category:</span> ${evento.category}</p>
              <p class="card-text"><span class="fw-bold">Place:</span> ${evento.place}</p>
              <p class="card-text"><span class="fw-bold">Capacity:</span> ${evento.capacity}</p>
              <p class="card-text"><span class="fw-bold">Estimate:</span> ${evento.estimate}</p>
              <p class="card-text"><span class="fw-bold">Price:</span> $${evento.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`
    contenedor.innerHTML = tarjeta
  })
  .catch(error => console.error('Error al cargar los datos:', error))