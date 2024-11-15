export async function geoFindMe() {
  const locationText = document.querySelector("#location");
  locationText.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude; //Широта
    const longitude = position.coords.longitude; //Долгота

    //   mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    // Запит даних зворотнього геокодування
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          const { city, country } = data.address;
          locationText.value = `${city || "невідомо"}, ${
            country || "невідомо"
          }`;
        } else {
          locationText.value = "Не вдалось отримати місцязнаходження";
        }
      })
      .catch(() => {
        locationText.value = "Помилка при отриманні даних місцязнаходження";
      });
  }

  function error() {
    locationText.value = "Неможливо отримати ваше місцязнаходження";
  }

  if (!navigator.geolocation) {
    locationText.value = "Geolocation не підтримується вашим браузером";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
