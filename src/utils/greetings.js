export const getGreeting = () => {
  const hour = new Date().getHours();

  // Definimos los rangos de tiempo para cada saludo
  if (hour >= 5 && hour < 12) {
    return "Buenos días";
  } else if (hour >= 12 && hour < 18) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
};