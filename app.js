// Datos de ejemplo del horario (puedes reemplazarlos con tu propio archivo .txt)
const horario = [
    { fechaInicio: "2023-10-09", fechaFin: "2023-12-20", dia: "Lunes", horaInicio: "08:00", horaFin: "09:30", asignatura: "Matemáticas", aula: "Aula 101", profesor: "Profesor A" },
    { fechaInicio: "2023-10-09", fechaFin: "2023-12-20", dia: "Lunes", horaInicio: "09:45", horaFin: "11:15", asignatura: "Historia", aula: "Aula 102", profesor: "Profesor B" },
    // Agrega más entradas según sea necesario
];

// Función para mostrar el horario en la página web
function mostrarHorario() {
    const tabla = document.getElementById("horario");

    // Encabezado de la tabla con los días de la semana
    const encabezado = `
        <tr>
            <th></th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
        </tr>
    `;

    // Llena la tabla con los datos del horario
    let contenidoTabla = '';
    const fechaActual = new Date(); // Obtén la fecha actual
    for (let hora = 7; hora <= 18; hora++) {
        contenidoTabla += '<tr>';
        if (hora === 7) {
            contenidoTabla += `<td>${hora}:00 am</td>`;
        } else {
            contenidoTabla += `<td>${hora}:00</td>`;
        }

        for (let dia = 1; dia <= 5; dia++) {
            const horaActual = (hora < 10 ? `0${hora}:00` : `${hora}:00`);
            const diaActual = getNombreDia(dia);

            const clase = horario.find(item =>
                item.dia === diaActual &&
                horaActual >= item.horaInicio &&
                horaActual <= item.horaFin &&
                fechaActual >= new Date(item.fechaInicio) &&
                fechaActual <= new Date(item.fechaFin)
            );

            if (clase) {
                contenidoTabla += `<td>${clase.asignatura}<br>${clase.profesor}<br>${clase.aula}</td>`;
            } else {
                contenidoTabla += '<td></td>';
            }
        }
        contenidoTabla += '</tr>';
    }

    tabla.innerHTML = encabezado + contenidoTabla;
}

// Función para obtener el nombre del día a partir de su número (1-5)
function getNombreDia(dia) {
    switch (dia) {
        case 1: return "Lunes";
        case 2: return "Martes";
        case 3: return "Miércoles";
        case 4: return "Jueves";
        case 5: return "Viernes";
        default: return "";
    }
}

// Variables globales para el rango de semana
let fechaInicioSemana;
let fechaFinSemana;

// Función para obtener la fecha de inicio y fin de la semana actual
function obtenerRangoSemana() {
    const fechaActual = new Date();
    const diaSemana = fechaActual.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    fechaInicioSemana = new Date(fechaActual);
    fechaFinSemana = new Date(fechaActual);

    // Ajustar la fecha de inicio al primer día (Lunes) de la semana actual
    fechaInicioSemana.setDate(fechaActual.getDate() - (diaSemana - 1));
    fechaInicioSemana.setHours(0, 0, 0, 0);

    // Ajustar la fecha de fin al último día (Viernes) de la semana actual
    fechaFinSemana.setDate(fechaActual.getDate() + (5 - diaSemana));
    fechaFinSemana.setHours(23, 59, 59, 999);

    return { fechaInicio: fechaInicioSemana, fechaFin: fechaFinSemana };
}

// Función para mostrar el horario en la página web
function mostrarHorario() {
    const tabla = document.getElementById("horario");

    // Obtener el rango de semana actual
    const rangoSemana = obtenerRangoSemana();

    // Encabezado de la tabla con los días de la semana
    const encabezado = `
        <tr>
            <th colspan="6">Horario Escolar (${rangoSemana.fechaInicio.toLocaleDateString()} - ${rangoSemana.fechaFin.toLocaleDateString()})</th>
        </tr>
        <tr>
            <th></th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
        </tr>
    `;

    // Llena la tabla con los datos del horario
    let contenidoTabla = '';
    const fechaActual = new Date(); // Obtén la fecha actual
    for (let hora = 7; hora <= 18; hora++) {
        contenidoTabla += '<tr>';
        if (hora === 7) {
            contenidoTabla += `<td>${hora}:00 am</td>`;
        } else {
            contenidoTabla += `<td>${hora}:00</td>`;
        }

        for (let dia = 1; dia <= 5; dia++) {
            const horaActual = (hora < 10 ? `0${hora}:00` : `${hora}:00`);
            const diaActual = getNombreDia(dia);

            const clase = horario.find(item =>
                item.dia === diaActual &&
                horaActual >= item.horaInicio &&
                horaActual <= item.horaFin &&
                fechaActual >= new Date(item.fechaInicio) &&
                fechaActual <= new Date(item.fechaFin)
            );

            if (clase) {
                contenidoTabla += `<td>${clase.asignatura}<br>${clase.profesor}<br>${clase.aula}</td>`;
            } else {
                contenidoTabla += '<td></td>';
            }
        }
        contenidoTabla += '</tr>';
    }

    tabla.innerHTML = encabezado + contenidoTabla;
}

// Función para avanzar a la siguiente semana
function avanzarSemana() {
    fechaInicioSemana.setDate(fechaInicioSemana.getDate() + 7);
    fechaFinSemana.setDate(fechaFinSemana.getDate() + 7);

    mostrarHorario();
}



// Función para retroceder a la semana anterior
function retrocederSemana() {
    fechaInicioSemana.setDate(fechaInicioSemana.getDate() - 7);
    fechaFinSemana.setDate(fechaFinSemana.getDate() - 7);
    mostrarHorario();
}

// Asociar eventos a los botones de navegación
document.getElementById("nextWeek").addEventListener("click", avanzarSemana);
document.getElementById("prevWeek").addEventListener("click", retrocederSemana);

// Llama a la función para mostrar el horario al cargar la página
mostrarHorario();

// Actualiza el encabezado de la semana al cargar la página
actualizarEncabezadoSemana();