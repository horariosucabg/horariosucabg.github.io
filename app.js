// Datos de ejemplo del horario (puedes reemplazarlos con tu propio archivo .txt)
const horario = [
    { dia: "Lunes", hora: "08:00-09:30", asignatura: "Matemáticas", aula: "Aula 101", profesor: "Profesor A" },
    { dia: "Lunes", hora: "09:45-11:15", asignatura: "Historia", aula: "Aula 102", profesor: "Profesor B" },
    // Agrega más entradas según sea necesario
];

// Función para mostrar el horario en la página web
function mostrarHorario() {
    const tabla = document.getElementById("horario");

    // Encabezados de la tabla
    tabla.innerHTML = `
        <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Asignatura</th>
            <th>Aula</th>
            <th>Profesor</th>
        </tr>
    `;

    // Llena la tabla con los datos del horario
    for (const clase of horario) {
        tabla.innerHTML += `
            <tr>
                <td>${clase.dia}</td>
                <td>${clase.hora}</td>
                <td>${clase.asignatura}</td>
                <td>${clase.aula}</td>
                <td>${clase.profesor}</td>
            </tr>
        `;
    }
}

// Llama a la función para mostrar el horario al cargar la página
mostrarHorario();
