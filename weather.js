#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printError, printSuccess } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storge.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token wasn't passed");
  } else {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token);
      printSuccess("Token was saved");
    } catch (e) {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) printHelp();
  if (args.t) saveToken(args.t);
  getWeather("London");
};

initCLI();
