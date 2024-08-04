// FUNCION PARA PINTAR TARJETAS
export function pintarTarjetas(arreglo, contenedor) {
    contenedor.innerHTML = ''

    if (arreglo.length === 0) {
        const mensaje = document.createElement('div')
        mensaje.id = 'no-notes'
        mensaje.className = 'text-center'
        mensaje.innerText = 'LO SENTIMOS, NO SE ENCONTRARON RESULTADOS EN TU BUSQUEDA'
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
            `
        contenedor.appendChild(tarjeta)
    })
}

// FUNCION PARA PINTAR CHECKBOXS
export function pintarCheckboxs(arreglo, contenedor) {
    contenedor.innerHTML = ''

    arreglo.forEach(category => {

        let categoria = document.createElement('div')
        categoria.className = 'form-check form-check-inline'
        categoria.innerHTML = `
          <input class="form-check-input border border-1 border-dark" type="checkbox" value="${category}" id="${category}">
          <label class="form-check-label" for="${category}">${category}</label>`
        contenedor.appendChild(categoria)
    })
}

// FUNCION DE FILTROS CEHECKBOXS Y TEXTO
export function filtrarEventos(arreglo, textoIngresado, checkboxes, contenedorTarjetas) {


    // FILTROS CRUZADOS PARA QUE FUNCIONEN EN CONJUNTO
    let eventosFiltrados = arreglo.filter(evento => {
        let coincideTexto = evento.name.toLowerCase().includes(textoIngresado) || evento.description.toLowerCase().includes(textoIngresado)
        let coincideCategoria = checkboxes.length === 0 || checkboxes.includes(evento.category)
        return coincideTexto && coincideCategoria
    })

    // PINTAR TARJETAS Y CHECKBOXS
    pintarTarjetas(eventosFiltrados, contenedorTarjetas)
}