#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import { printHelp, printError, printSuccess, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storge.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token wasn't passed");
  } else {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token, token, token, token, token);
      printSuccess("Token was saved");
    } catch (e) {
      printError(e.message);
    }
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("City wasn't passed");
  } else {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.city, city);
      printSuccess("City was saved");
    } catch (e) {
      printError(e.message);
    }
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e.response?.status === 404) {
      printError("Not correct city");
    } else if (e.response?.status === 401) {
      printError("Not correct token");
    } else if (e.response?.status === 400) {
      printError("Not correct token");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) return printHelp();
  if (args.s) return saveCity(args.s);
  if (args.t) return saveToken(args.t);
  return getForcast();
};

initCLI();
