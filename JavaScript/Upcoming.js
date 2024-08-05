import * as modulo from '../Modules/Modules.js'

// SELECCION DE ELEMENTOS EN EL DOM
let contenedorTarjetas = document.getElementById("contenedorTarjetas")
let containerChecks = document.getElementById("containerChecks")
let buscarTexto = document.getElementById('buscarTexto')

// Variables Universales
let data
let eventos
let eventosFuturos
let propiedadesUnicas

// Funcion para obtener informacion de la API
function cargarDatos() {
  modulo.obtenerDatos()
    .then(datos => {
      data = datos
      eventos = data.events

      // Filtro de ctaegorias unicas
      propiedadesUnicas = [...new Set(eventos.map(event => event.category))]

      // Filtro de eventos futuros
      eventosFuturos = eventos.filter(evento => evento.date > data.currentDate)



      // Importar funciones pintarTarjetas y checkboxs
      modulo.pintarTarjetas(eventosFuturos, contenedorTarjetas)
      modulo.pintarCheckboxs(propiedadesUnicas, containerChecks)
    })
    .catch(error => console.error('Error al cargar los datos:', error))
}


// Funcion para actualizar la funcion filtrarEventos
function actualizarFiltros() {
  let texto = buscarTexto.value.toLowerCase()
  let checkboxesMarcados = Array.from(document.querySelectorAll('#containerChecks input[type=checkbox]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
  modulo.filtrarEventos(eventosFuturos, texto, checkboxesMarcados, contenedorTarjetas)
}

// EVENTOS
window.addEventListener('load', cargarDatos)
buscarTexto.addEventListener('input', actualizarFiltros)
containerChecks.addEventListener('change', actualizarFiltros)