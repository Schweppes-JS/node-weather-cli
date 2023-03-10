import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storge.service.js";

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "âī¸";
    case "02":
      return "đ¤ī¸";
    case "03":
      return "âī¸";
    case "04":
      return "âī¸";
    case "09":
      return "đ§ī¸";
    case "10":
      return "đĻī¸";
    case "11":
      return "đŠī¸";
    case "13":
      return "âī¸";
    case "50":
      return "đĢī¸";
  }
};

export const getWeather = async (city) => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  if (!token) throw new Error("API key not setted, set it throw command -t [API_KEY]");
  if (!city) throw new Error("City not setted, set it throw command -s [CITY]");
  const data = await axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: city, appid: token, lang: "en", units: "metric" },
    })
    .then((response) => response.data);
  return data;
};
