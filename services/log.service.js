import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (error) => {
  console.log(chalk.bgRed("ERROR") + " " + error);
};

export const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + message);
};

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
    Without params - weather output
    -s [CITY] for city choosing
    -h for output help
    -t [API_KEY] for saving token
    `
  );
};

export const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow("WHEATHER")} Whether in ${res.name}
    ${icon} ${res.weather[0].description}
    Temprature: ${res.main.temp} (feels like ${res.main.feels_like})
    Humidity: ${res.main.humidity}% 
    Wind speed: ${res.wind.speed}
    `
  );
};
