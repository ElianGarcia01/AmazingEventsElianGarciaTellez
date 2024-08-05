export function obtenerDatos() {
    return fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(respuesta => respuesta.json())
}

export function pintarTarjetas(arreglo, contenedor) {
    contenedor.innerHTML = ''

    if (arreglo.length === 0) {
        const mensaje = document.createElement('div')
        mensaje.id = 'no-notes'
        mensaje.className = 'text-center fs-5'
        mensaje.innerText = 'Lo sentimos, no encontramos ninguna coincidencia. Intenta ajustar los filtros o busca de nuevo con otras palabras.'
        contenedor.appendChild(mensaje)
    }

    arreglo.forEach(eventos => {
        let tarjeta = document.createElement('div')
        tarjeta.className = "col"
        tarjeta.innerHTML = `
              <div class="card border border-1 border-dark h-100">
                  <img src=${eventos.image} class="card-img-top img-fluid imageH" alt="card">
                  <div class="card-body mx-auto h-100 d-flex flex-column justify-content-around w-100">
                      <h5 class="card-title text-center">${eventos.name}</h5>
                      <p class="card-text">${eventos.description}</p>
                      <p class="card-text">Category: ${eventos.category}</p>
                      <p class="card-text">Capacity: ${eventos.capacity}</p>
                      <div class="d-flex justify-content-between">
                          <p>Price: ${eventos.price}</p>
                          <a href="./Details.html?id=${eventos._id}" class="btn btn-danger">Details</a>
                      </div>
                  </div>
              </div>
              `;
        contenedor.appendChild(tarjeta);
    })
}

export function pintarCheckboxs(arreglo, contenedor) {
    contenedor.innerHTML = '';

    arreglo.forEach(category => {
        let categoria = document.createElement('div');
        categoria.className = 'form-check form-check-inline';
        categoria.innerHTML = `
            <input class="form-check-input border-2 border-dark" type="checkbox" value="${category}" id="${category}">
            <label class="form-check-label" for="${category}">${category}</label>`;
        contenedor.appendChild(categoria);
    });
}

export function filtrarEventos(arreglo, textoIngresado, checkboxes, contenedorTarjetas) {
    let eventosFiltrados = arreglo.filter(evento => {
        let coincideTexto = evento.name.toLowerCase().includes(textoIngresado) || evento.description.toLowerCase().includes(textoIngresado);
        let coincideCategoria = checkboxes.length === 0 || checkboxes.includes(evento.category);
        return coincideTexto && coincideCategoria;
    });

    pintarTarjetas(eventosFiltrados, contenedorTarjetas);
}