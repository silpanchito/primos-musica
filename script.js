// ===================================================
// script.js — Números Primos en la Música
// INF-111 · UMSA
// ===================================================
// Todo acceso al HTML usa document.getElementById()
// No se usan arreglos para el algoritmo de primos.
// El rango se recorre con ciclos for anidados.
// ===================================================


// ---------------------------------------------------
// TABLA DE NOTAS MUSICALES (frecuencias en Hz)
// La octava 4 es la central (La4 = 440 Hz estándar)
// Se usa para mostrar la nota más cercana a cada primo
// ---------------------------------------------------
var NOTAS = [
  { nombre: "Do0",  hz: 16.35 },
  { nombre: "Re0",  hz: 18.35 },
  { nombre: "Mi0",  hz: 20.60 },
  { nombre: "Fa0",  hz: 21.83 },
  { nombre: "Sol0", hz: 24.50 },
  { nombre: "La0",  hz: 27.50 },
  { nombre: "Si0",  hz: 30.87 },
  { nombre: "Do1",  hz: 32.70 },
  { nombre: "Re1",  hz: 36.71 },
  { nombre: "Mi1",  hz: 41.20 },
  { nombre: "Fa1",  hz: 43.65 },
  { nombre: "Sol1", hz: 49.00 },
  { nombre: "La1",  hz: 55.00 },
  { nombre: "Si1",  hz: 61.74 },
  { nombre: "Do2",  hz: 65.41 },
  { nombre: "Re2",  hz: 73.42 },
  { nombre: "Mi2",  hz: 82.41 },
  { nombre: "Fa2",  hz: 87.31 },
  { nombre: "Sol2", hz: 98.00 },
  { nombre: "La2",  hz: 110.00 },
  { nombre: "Si2",  hz: 123.47 },
  { nombre: "Do3",  hz: 130.81 },
  { nombre: "Re3",  hz: 146.83 },
  { nombre: "Mi3",  hz: 164.81 },
  { nombre: "Fa3",  hz: 174.61 },
  { nombre: "Sol3", hz: 196.00 },
  { nombre: "La3",  hz: 220.00 },
  { nombre: "Si3",  hz: 246.94 },
  { nombre: "Do4",  hz: 261.63 },
  { nombre: "Re4",  hz: 293.66 },
  { nombre: "Mi4",  hz: 329.63 },
  { nombre: "Fa4",  hz: 349.23 },
  { nombre: "Sol4", hz: 392.00 },
  { nombre: "La4",  hz: 440.00 },
  { nombre: "Si4",  hz: 493.88 },
  { nombre: "Do5",  hz: 523.25 },
  { nombre: "Re5",  hz: 587.33 },
  { nombre: "Mi5",  hz: 659.25 },
  { nombre: "Fa5",  hz: 698.46 },
  { nombre: "Sol5", hz: 783.99 },
  { nombre: "La5",  hz: 880.00 },
  { nombre: "Si5",  hz: 987.77 },
  { nombre: "Do6",  hz: 1046.50 },
  { nombre: "Re6",  hz: 1174.66 },
  { nombre: "Mi6",  hz: 1318.51 },
  { nombre: "Fa6",  hz: 1396.91 },
  { nombre: "Sol6", hz: 1567.98 },
  { nombre: "La6",  hz: 1760.00 },
  { nombre: "Si6",  hz: 1975.53 },
  { nombre: "Do7",  hz: 2093.00 },
  { nombre: "Re7",  hz: 2349.32 },
  { nombre: "Mi7",  hz: 2637.02 },
  { nombre: "Fa7",  hz: 2793.83 },
  { nombre: "Sol7", hz: 3135.96 },
  { nombre: "La7",  hz: 3520.00 },
  { nombre: "Si7",  hz: 3951.07 },
  { nombre: "Do8",  hz: 4186.01 }
];


// ---------------------------------------------------
// FUNCIÓN: verificar si un número es primo
// Usa solo variables simples y un ciclo for,
// sin arreglos. Cuenta divisores con el módulo %.
// ---------------------------------------------------
function esPrimo(numero) {
  // Los números menores a 2 no son primos por definición
  if (numero < 2) {
    return false;
  }

  var contador = 0;

  // Recorremos todos los números del 1 al número mismo
  for (var i = 1; i <= numero; i++) {
    // Si divide exactamente (sin residuo), es un divisor
    if (numero % i == 0) {
      contador = contador + 1;
    }
  }

  // Un número primo tiene EXACTAMENTE 2 divisores: 1 y sí mismo
  if (contador == 2) {
    return true;
  } else {
    return false;
  }
}


// ---------------------------------------------------
// FUNCIÓN: encontrar la nota musical más cercana
// Recorre la tabla de notas y compara distancias
// Devuelve el nombre de la nota más próxima en Hz
// ---------------------------------------------------
function notaMasCercana(frecuencia) {
  var nombreCercano  = "fuera de rango";
  var distanciaMinima = 999999;

  for (var j = 0; j < NOTAS.length; j++) {
    var distancia = NOTAS[j].hz - frecuencia;
    if (distancia < 0) {
      distancia = distancia * -1;  // valor absoluto sin Math.abs
    }
    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      nombreCercano = NOTAS[j].nombre;
    }
  }

  return nombreCercano;
}


// ---------------------------------------------------
// FUNCIÓN PRINCIPAL: buscarPrimos()
// Se llama al presionar el botón.
// Lee el formulario, valida, calcula y muestra.
// ---------------------------------------------------
function buscarPrimos() {

  // --- 1. LEER DATOS con getElementById() ---
  var inputInicio  = document.getElementById("rango-inicio");
  var inputFin     = document.getElementById("rango-fin");
  var divResultado = document.getElementById("resultado");
  var divError     = document.getElementById("mensaje-error");
  var resumenDiv   = document.getElementById("resultado-resumen");
  var estadisticas = document.getElementById("estadisticas");
  var listaPrimos  = document.getElementById("lista-primos");
  var tablaBody    = document.getElementById("tabla-primos");

  var inicio = parseInt(inputInicio.value);
  var fin    = parseInt(inputFin.value);

  // --- 2. OCULTAR mensajes previos ---
  divResultado.style.display = "none";
  divError.style.display     = "none";

  // --- 3. VALIDAR entrada ---
  if (isNaN(inicio) || isNaN(fin)) {
    divError.innerHTML = "⚠️ Por favor ingresa ambos valores del rango.";
    divError.style.display = "block";
    return;
  }

  if (inicio < 2) {
    divError.innerHTML = "⚠️ La frecuencia inicial debe ser al menos 2 Hz.";
    divError.style.display = "block";
    return;
  }

  if (fin > 20000) {
    divError.innerHTML = "⚠️ La frecuencia final no puede superar 20,000 Hz.";
    divError.style.display = "block";
    return;
  }

  if (inicio >= fin) {
    divError.innerHTML = "⚠️ La frecuencia inicial debe ser menor que la final.";
    divError.style.display = "block";
    return;
  }

  if ((fin - inicio) > 5000) {
    divError.innerHTML = "⚠️ El rango es muy amplio (máximo 5,000). Intenta con un rango más pequeño.";
    divError.style.display = "block";
    return;
  }

  // --- 4. CALCULAR primos en el rango ---
  var totalNumeros    = 0;
  var totalPrimos     = 0;
  var primerPrimo     = -1;
  var ultimoPrimo     = -1;

  var chipsHTML = "";   // chips visuales de primos
  var filasHTML = "";   // filas de la tabla completa

  for (var numero = inicio; numero <= fin; numero++) {
    totalNumeros = totalNumeros + 1;

    var primo = esPrimo(numero);
    var nota  = notaMasCercana(numero);

    if (primo) {
      totalPrimos = totalPrimos + 1;

      if (primerPrimo == -1) {
        primerPrimo = numero;  // guardar el primero encontrado
      }
      ultimoPrimo = numero;    // siempre actualizar el último

      // Chip visual para la lista
      chipsHTML = chipsHTML + "<span class='chip-primo'>" + numero + " Hz</span>";
    }

    // Fila de la tabla (solo mostramos los primos para no saturar)
    if (primo) {
      filasHTML = filasHTML +
        "<tr>" +
          "<td class='td-primo'>" + totalPrimos + "</td>" +
          "<td class='td-primo-si'>" + numero + " Hz</td>" +
          "<td class='td-primo-si'>✓ Sí es primo</td>" +
          "<td style='color:var(--dorado-claro)'>" + nota + "</td>" +
        "</tr>";
    }
  }

  // --- 5. MOSTRAR RESULTADOS en la página ---

  // Resumen
  resumenDiv.innerHTML =
    "Rango analizado: <strong>" + inicio + " Hz</strong> a <strong>" + fin + " Hz</strong>";

  // Tarjetas de estadísticas
  var porcentaje = 0;
  if (totalNumeros > 0) {
    porcentaje = ((totalPrimos / totalNumeros) * 100).toFixed(1);
  }

  estadisticas.innerHTML =
    "<div class='stat-card'>" +
      "<div class='stat-numero'>" + totalNumeros + "</div>" +
      "<div class='stat-label'>Números analizados</div>" +
    "</div>" +
    "<div class='stat-card'>" +
      "<div class='stat-numero'>" + totalPrimos + "</div>" +
      "<div class='stat-label'>Primos encontrados</div>" +
    "</div>" +
    "<div class='stat-card'>" +
      "<div class='stat-numero dorado'>" + porcentaje + "%</div>" +
      "<div class='stat-label'>Del rango son primos</div>" +
    "</div>" +
    "<div class='stat-card'>" +
      "<div class='stat-numero dorado' style='font-size:1.5rem'>" +
        (primerPrimo != -1 ? notaMasCercana(primerPrimo) : "—") +
      "</div>" +
      "<div class='stat-label'>Nota del 1er primo</div>" +
    "</div>";

  // Lista de chips
  if (chipsHTML == "") {
    chipsHTML = "<span style='color:var(--gris-medio);font-size:0.85rem'>No se encontraron números primos en este rango.</span>";
  }
  listaPrimos.innerHTML = chipsHTML;

  // Tabla
  if (filasHTML == "") {
    filasHTML = "<tr><td colspan='4' style='text-align:center;color:var(--gris-medio);padding:1.5rem'>Sin primos en el rango.</td></tr>";
  }
  tablaBody.innerHTML = filasHTML;

  // Mostrar el bloque de resultados
  divResultado.style.display = "block";

  // Desplazar hacia los resultados suavemente
  divResultado.scrollIntoView({ behavior: "smooth", block: "start" });
}