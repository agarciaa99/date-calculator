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

  // Crear fecha base a partir de los valores de años, meses y días
  const startDate = new Date(0, 0, 1); // Fecha base: 1 de enero del año 0
  startDate.setFullYear(startDate.getFullYear() + years);
  startDate.setMonth(startDate.getMonth() + months);
  startDate.setDate(startDate.getDate() + days);

  // Convertir todo a días y restar la fracción de días
  const totalDays = Math.floor(
    (Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    ) -
      Date.UTC(0, 0, 1)) /
      (1000 * 60 * 60 * 24)
  );

  const daysToReduce = totalDays * (numerator / denominator);

  console.log(`Total Days: ${totalDays}, Days to reduce: ${daysToReduce}`);

  const reducedDate = new Date(startDate);
  reducedDate.setDate(reducedDate.getDate() - Math.round(daysToReduce)); // Redondear la cantidad de días

  // Función para calcular la diferencia precisa entre fechas
  function calculateDifference(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    // Ajuste si los días son negativos
    if (days < 0) {
      const previousMonthDays = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      ).getDate();
      days += previousMonthDays;
      months -= 1;
    }

    // Ajuste si los meses son negativos
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days };
  }

  // Calcular la diferencia ajustada entre la fecha reducida y la fecha inicial
  const {
    years: adjustedYears,
    months: adjustedMonths,
    days: adjustedDays,
  } = calculateDifference(reducedDate, startDate);

  // Muestra el resultado
  document.querySelector(
    "#result"
  ).textContent = `${adjustedYears} años, ${adjustedMonths} meses y ${adjustedDays} días.`;

  // Botón para reiniciar
  document.querySelector("#reset-button").addEventListener("click", () => {
    document.querySelector("#calculator").reset();
    document.querySelector("#result").textContent = "";
  });
});
