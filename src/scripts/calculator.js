document.querySelector("#calculator").addEventListener("submit", (e) => {
  e.preventDefault();

  const years = parseInt(document.querySelector("#years").value) || 0;
  const months = parseInt(document.querySelector("#months").value) || 0;
  const days = parseInt(document.querySelector("#days").value) || 0;
  const fraction = document.querySelector("#fraction").value.trim();

  // Convertir fracción a número
  const [numerator, denominator] = fraction.split("/").map(Number);
  if (!denominator || isNaN(numerator) || isNaN(denominator)) {
    alert("Fracción inválida");
    return;
  }

  // Crear fecha base (usamos 2000 como año base para evitar problemas con años anteriores a 1970)
  const baseYear = 2000;
  const startDate = new Date(baseYear, 0, 1); // 1 de enero del año base

  // Agregar el período especificado
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + years);
  endDate.setMonth(endDate.getMonth() + months);
  endDate.setDate(endDate.getDate() + days - 1);

  // Calcular días totales considerando años bisiestos
  const totalDays =
    Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Calcular días a restar basados en la fracción
  const daysToSubtract = Math.round(totalDays * (numerator / denominator));

  // Calcular fecha final restando los días
  const finalDate = new Date(endDate);
  finalDate.setDate(finalDate.getDate() - daysToSubtract);

  // Función para calcular diferencia precisa entre fechas
  function getDateDifference(start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Ajustar si los días son negativos
    if (days < 0) {
      months--;
      // Obtener último día del mes anterior
      const lastDayOfMonth = new Date(
        end.getFullYear(),
        end.getMonth(),
        0
      ).getDate();
      days += lastDayOfMonth;
    }

    // Ajustar si los meses son negativos
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  // Calcular la diferencia entre la fecha base y la fecha final (lo que queda)
  const difference = getDateDifference(startDate, finalDate);

  // Mostrar el resultado
  document.querySelector(
    "#result"
  ).textContent = `${difference.years} años, ${difference.months} meses y ${difference.days} días.`;
});

// Evento para el botón de reinicio
document.querySelector("#reset-button").addEventListener("click", () => {
  document.querySelector("#calculator").reset();
  document.querySelector("#result").textContent = "";
});
