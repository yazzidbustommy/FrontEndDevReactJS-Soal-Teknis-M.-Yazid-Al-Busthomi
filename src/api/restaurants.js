import axios from "axios";

const API_URL =
  "https://672f2c82229a881691f20f0f.mockapi.io/restaurants/api/v1";

export async function fetchRestaurants(cuisineType = "") {
  const params = cuisineType ? { cuisineType } : {};
  const response = await axios.get(`${API_URL}/restaurants`, { params });
  return response.data;
}

export async function fetchRestaurantDetails(id) {
  const response = await axios.get(`${API_URL}/restaurants/${id}`);
  return response.data;
}
