export const fetchGeoData = async (city) => {
  const apiKey = import.meta.env.REACT_APP_CITY_AUTOCOMPLETE_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    city
  )}&lang=en&limit=1&type=city&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const [lon, lat] = data.features[0].geometry.coordinates;
    return { lon, lat };
  } catch (error) {
    console.error("Error fetching geo data:", error);
    return null;
  }
};