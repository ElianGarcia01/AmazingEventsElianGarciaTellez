import * as modulo from '../Modules/modules.js'

// IMPORTAR INFORMACION DE LA API
modulo.obtenerDatos()
    .then(datos => {
        let data = datos
        let eventos = data.events

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

        // ENCONTRAR EL EVENTO CON MAYOR CAPACIDAD

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
                <td class="text-center">The event with the highest capacity is: ${eventoMaxCapacidad.name}, with a capacity of ${maxCapacidad}</td>
            `
            tableBody.appendChild(row)
        }


        // UPCOMINGS EVENTS
        let tableBodyUpcomings = document.querySelector('#upcomingsEvents tbody')
        tableBodyUpcomings.innerHTML = ''

        eventos.forEach(datos => {


            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${datos.name} </td>
                        <td>${datos.date} </td>
                        <td>${datos.category} </td>
        `
            tableBodyUpcomings.appendChild(row)
        })

        // PAST EVENTS
        let tableBodyPast = document.querySelector('#pastEvents tbody')
        tableBodyPast.innerHTML = ''

        eventos.forEach(datos => {


            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${datos.name} </td>
                        <td>${datos.date} </td>
                        <td>${datos.category} </td>
        `
            tableBodyPast.appendChild(row)
        })
    })
    .catch(error => console.error('Error al cargar los datos:', error))