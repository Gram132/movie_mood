import api from "../services/api.js";

export const sendRequest = async (prompt) => {

    try {
      const response = await api.post("/recommendations/text", { prompt });
      const movies = response.data;
      console.log(movies)
      return movies
    } catch (error) {
      console.log("Sorry, something went wrong!")
      return []
    }
  };