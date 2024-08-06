import * as modulo from '../Modules/Modules.js'

// IMPORTAR INFORMACION DE LA API
modulo.obtenerDatos()
    .then(datos => {
        let data = datos
        let eventos = data.events

        // Filtro de eventos futuros
        let eventosFuturos = eventos.filter(evento => evento.date > data.currentDate)
        let eventosPasados = eventos.filter(evento => evento.date < data.currentDate)


        // TABLA EVENTS ESTATISTICS

        // ENCONTRAR EL EVENTO CON EL MAYOR PORCENTAJE DE ASISTENCIA
        let maxPorcentajeAsistencia = 0
        let eventoMaxAsistencia = null

        eventos.forEach(evento => {
            let asistencia = evento.assistance
            let capacidad = evento.capacity

            // VERIFICAR QUE ASISTENCIA Y CAPACIDAD NO SEAN INDEFINIDAS
            if (asistencia !== undefined && capacidad !== undefined) {
                let porcentajeAsistencia = (asistencia / capacidad) * 100

                if (porcentajeAsistencia > maxPorcentajeAsistencia) {
                    maxPorcentajeAsistencia = porcentajeAsistencia
                    eventoMaxAsistencia = evento
                }
            }
        })

        // ENCONTRAR EL EVENTO CON MENOR PORCENTAJE DE ASISTENCIA
        let minPorcentajeAsistencia = 100
        let eventoMinAsistencia = null

        eventos.forEach(evento => {
            let asistencia = evento.assistance
            let capacidad = evento.capacity

            // VERIFICAR QUE ASISTENCIA Y CAPACIDAD NO SEAN INDEFINIDAS
            if (asistencia !== undefined && capacidad !== undefined) {
                let porcentajeAsistencia = (asistencia / capacidad) * 100

                if (porcentajeAsistencia < minPorcentajeAsistencia) {
                    minPorcentajeAsistencia = porcentajeAsistencia
                    eventoMinAsistencia = evento
                }
            }
        })

        // ENCONTRAR EL EVENTO CON LA MAYOR CAPACIDAD
        let maxCapacidad = 0
        let eventoMaxCapacidad = null

        eventos.forEach(evento => {
            let capacidad = evento.capacity

            // VERIFICAR QUE CAPACIDAD NO SEA INDEFINIDA
            if (capacidad !== undefined) {
                if (capacidad > maxCapacidad) {
                    maxCapacidad = capacidad
                    eventoMaxCapacidad = evento
                }
            }
        })

        // MOSTRAR FILA DE LA TABLA COMPLETA CON LAS TRES ESTADISTICAS
        let tableBody = document.querySelector('#events tbody')
        tableBody.innerHTML = '' // Limpia la tabla antes de agregar nuevas filas

        if (eventoMaxAsistencia && eventoMinAsistencia && eventoMaxCapacidad) {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td class="text-center">The event with the highest percentage of assistance is: ${eventoMaxAsistencia.name}, with ${maxPorcentajeAsistencia.toFixed(2)} % of assistance</td>
                <td class="text-center">The event with the lowest percentage of assistance is: ${eventoMinAsistencia.name}, with ${minPorcentajeAsistencia.toFixed(2)} % of assistance</td>
                <td class="text-center">The event with the highest capacity is: ${eventoMaxCapacidad.name}, with a capacity of ${maxCapacidad.toLocaleString('en-US')} people</td>
            `
            tableBody.appendChild(row)
        }


        // UPCOMINGS EVENTS BY CATEGORIA

        // Objeto para acumular las ganancias por categoría
        let gananciasPorCategoria = {}

        eventosFuturos.forEach(evento => {

            let categoria = evento.category

            // Inicializar la categoría en el objeto si no existe
            if (!gananciasPorCategoria[categoria]) {
                gananciasPorCategoria[categoria] = {
                    asistidas: 0,
                    estimadas: 0,
                    totales: 0,
                    asistencia: 0,
                    capacidad: 0,
                    porcentaje: 0
                }
            }

            // Calcular ganancias asistidas si assistance no es undefined
            if (evento.assistance !== undefined) {
                let gananciasAsistidas = evento.assistance * evento.price
                gananciasPorCategoria[categoria].asistidas += gananciasAsistidas

            }

            // Calcular ganancias estimadas si estimate no es undefined
            if (evento.estimate !== undefined) {
                let gananciasEstimadas = evento.estimate * evento.price
                gananciasPorCategoria[categoria].estimadas += gananciasEstimadas
                gananciasPorCategoria[categoria].asistencia += evento.estimate
                gananciasPorCategoria[categoria].capacidad += evento.capacity
            }

            // Actualizar el total de ganancias para la categoría
            gananciasPorCategoria[categoria].totales = gananciasPorCategoria[categoria].asistidas + gananciasPorCategoria[categoria].estimadas
        })

        // Mostrar informacion en la tabla
        for (let categoria in gananciasPorCategoria) {
            if (gananciasPorCategoria[categoria].capacidad > 0) {
                gananciasPorCategoria[categoria].porcentaje = (gananciasPorCategoria[categoria].asistencia / gananciasPorCategoria[categoria].capacidad) * 100
            }

            let tableBodyUpcomings = document.querySelector('#upcomingsEvents tbody')
            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${categoria}</td>
                        <td>$ ${gananciasPorCategoria[categoria].totales.toLocaleString('en-US')}</td>
                        <td>${gananciasPorCategoria[categoria].porcentaje.toFixed(2)} %</td>
                        `
            tableBodyUpcomings.appendChild(row)
        }


        // PAST EVENTS

        // Objeto para acumular las ganancias por categoría
        gananciasPorCategoria = {}

        eventosPasados.forEach(evento => {

            let categoria = evento.category

            // Inicializar la categoría en el objeto si no existe
            if (!gananciasPorCategoria[categoria]) {
                gananciasPorCategoria[categoria] = {
                    asistidas: 0,
                    estimadas: 0,
                    totales: 0,
                    asistencia: 0,
                    capacidad: 0,
                    porcentaje: 0
                }
            }

            // Calcular ganancias asistidas si assistance no es undefined
            if (evento.assistance !== undefined) {
                let gananciasAsistidas = evento.assistance * evento.price
                gananciasPorCategoria[categoria].asistidas += gananciasAsistidas
                gananciasPorCategoria[categoria].asistencia += evento.assistance
                gananciasPorCategoria[categoria].capacidad += evento.capacity
            }

            // Calcular ganancias estimadas si estimate no es undefined
            if (evento.estimate !== undefined) {
                let gananciasEstimadas = evento.estimate * evento.price
                gananciasPorCategoria[categoria].estimadas += gananciasEstimadas
            }

            // Actualizar el total de ganancias para la categoría
            gananciasPorCategoria[categoria].totales = gananciasPorCategoria[categoria].asistidas + gananciasPorCategoria[categoria].estimadas
        })

        // Mostrar informacion en la tabla
        for (let categoria in gananciasPorCategoria) {

            if (gananciasPorCategoria[categoria].capacidad > 0) {
                gananciasPorCategoria[categoria].porcentaje = (gananciasPorCategoria[categoria].asistencia / gananciasPorCategoria[categoria].capacidad) * 100
            }

            let tableBodyPast = document.querySelector('#pastEvents tbody')
            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${categoria}</td>
                        <td>$ ${gananciasPorCategoria[categoria].totales.toLocaleString('en-US')}</td>
                        <td>${gananciasPorCategoria[categoria].porcentaje.toFixed(2)} %</td>
                        `
            tableBodyPast.appendChild(row)
        }
    })
    .catch(error => console.error('Error al cargar los datos:', error))