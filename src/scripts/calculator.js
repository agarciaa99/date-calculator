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

  // Convertir todo a meses para un cálculo más preciso
  const totalMonths = years * 12 + months + days / 30.44;

  // Calcular los meses a restar basados en la fracción
  const monthsToSubtract = totalMonths * (numerator / denominator);

  // Calcular los meses restantes después de la resta
  const remainingMonths = totalMonths - monthsToSubtract;

  // Convertir el resultado a años, meses y días
  const resultYears = Math.floor(remainingMonths / 12);
  const resultMonths = Math.floor(remainingMonths % 12);
  const resultDays = Math.round((remainingMonths % 1) * 30.44);

  // Muestra el resultado
  document.querySelector(
    "#result"
  ).textContent = `${resultYears} años, ${resultMonths} meses y ${resultDays} días.`;
});

// Evento para el botón de reinicio
document.querySelector("#reset-button").addEventListener("click", () => {
  document.querySelector("#calculator").reset();
  document.querySelector("#result").textContent = "";
});
