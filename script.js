document.addEventListener("DOMContentLoaded", function () {
    const fechaActualElement = document.getElementById("fecha-actual");
    const anteriorSemanaButton = document.getElementById("anterior-semana");
    const semanaActualButton = document.getElementById("semana-actual");
    const siguienteSemanaButton = document.getElementById("siguiente-semana");
    const tablaHorarios = document.getElementById("tabla-horarios");
    const laboratorioSelect = document.getElementById("laboratorio-select");
    const horarios = [];
    let fechaActual = new Date(); // Inicializa la fecha actual

    function mostrarFechaActual() {
        const primerDiaSemana = fechaActual.getDate() - fechaActual.getDay() + 1;
        const ultimoDiaSemana = primerDiaSemana + 4;
        const fechaInicioSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), primerDiaSemana);
        const fechaFinSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), ultimoDiaSemana);

        const formatoFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaInicioTexto = fechaInicioSemana.toLocaleDateString('es-ES', formatoFecha);
        const fechaFinTexto = fechaFinSemana.toLocaleDateString('es-ES', formatoFecha);

        
        fechaActualElement.textContent = `Semana del ${fechaInicioTexto} al ${fechaFinTexto}`;
    }

    function cargarDatosDesdeArchivo() {
        const archivoUrl = "horarios.json"; // Ruta relativa al archivo JSON

        fetch(archivoUrl)
            .then(response => response.json())
            .then(data => {
                // Asignar los datos cargados desde el archivo JSON a la variable horarios
                horarios.length = 0; // Vaciar el arreglo actual
                Array.prototype.push.apply(horarios, data); // Agregar los nuevos horarios

                // Mostrar los horarios actualizados en la tabla
                mostrarHorariosEnTabla(laboratorioSelect.value);
            })
            .catch(error => {
                console.error("Error al cargar el archivo:", error);
            });
    }

    cargarDatosDesdeArchivo();

    function mostrarHorariosEnTabla(laboratorioSeleccionado) {
        tablaHorarios.innerHTML = ""; // Limpiar la tabla
    
        // Crear una matriz de horarios con días de la semana y horas
        const matrizHorarios = Array.from({ length: 12 }, () => Array(5).fill(""));
    
        // Calcular la fecha de inicio de la semana actual
        const primerDiaSemana = fechaActual.getDate() - fechaActual.getDay() + 1;
        const inicioSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), primerDiaSemana);
    
        // Calcular la fecha de fin de la semana actual
        const ultimoDiaSemana = primerDiaSemana + 4;
        const finSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), ultimoDiaSemana);
    
        for (const horario of horarios) {
            if (!laboratorioSeleccionado || horario.laboratorio === laboratorioSeleccionado) {
                const diaSemana = horario.diaSemana;
                const fechaInicio = new Date(horario.fechaInicio);
                const fechaFin = new Date(horario.fechaFin);
    
                // Verificar si el horario está dentro del rango de la semana actual
                if (finSemana >= fechaInicio &&  fechaInicio >= inicioSemana || inicioSemana <= fechaFin && fechaFin <= finSemana) {
                    const horaInicio = fechaInicio.getHours();
                    const horaFin = fechaFin.getHours();
    
                    // Verificar si el horario está dentro de las horas de trabajo (7 AM - 6 PM)
                    if (horaInicio >= 7 && horaFin <= 18) {
                        const columna = {
                            "Lunes": 1,
                            "Martes": 2,
                            "Miércoles": 3,
                            "Jueves": 4,
                            "Viernes": 5
                        }[diaSemana];
    
                        for (let hora = horaInicio; hora <= horaFin; hora++) {
                            const fila = hora - 7;
                            matrizHorarios[fila][columna] = `${horario.profesor}  -  ${horario.materia}`;
                        }
                    }
                }
            }
        }
    
        for (let hora = 7; hora <= 18; hora++) {
            const fila = document.createElement("tr");
            const horaCelda = document.createElement("td");
            const horaInicio12H = hora % 12 === 0 ? 12 : hora % 12; // Convierte la hora a 12 horas
            const amPm = hora < 12 ? "AM" : "PM"; // Determina si es AM o PM
            
            horaCelda.textContent = `${horaInicio12H}:00 ${amPm}`;
            fila.appendChild(horaCelda);
    
            for (let dia = 1; dia <= 5; dia++) {
                const celda = document.createElement("td");
                celda.textContent = matrizHorarios[hora - 7][dia];
                fila.appendChild(celda);
            }
    
            tablaHorarios.appendChild(fila);
        }
    }
    

    mostrarFechaActual();
    mostrarHorariosEnTabla(laboratorioSelect.value);

    semanaActualButton.addEventListener("click", function () {
        fechaActual = new Date();
        mostrarFechaActual();
        mostrarHorariosEnTabla(laboratorioSelect.value);
    });

    siguienteSemanaButton.addEventListener("click", function () {
        const inicioSemana = new Date(fechaActual);
        const finSemana = new Date(fechaActual);
        inicioSemana.setDate(fechaActual.getDate() + 7);
        finSemana.setDate(fechaActual.getDate() + 11);

        fechaActual = inicioSemana;
        mostrarFechaActual();
        mostrarHorariosEnTabla(laboratorioSelect.value, inicioSemana, finSemana);
    });

    laboratorioSelect.addEventListener("change", function () {
        mostrarHorariosEnTabla(laboratorioSelect.value);
    });
});
