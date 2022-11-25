import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = err => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + err);
};

const printSuccess = msg => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		If you don't provide any params, you'll get a forecast
		-s [CITY] sets your city for the forecast
		-h will show you a help note
		-t [API_KEY] sets you token for the forecast API
		`
	);
};

const printForecast = (data, icon) => {
	console.log(data);
	/**
	 * Making our forecast data from API prettier, string with result is returned
	 */
	const { weather } = data;
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} Weather in ${data.name}
		${icon}  ${data.weather[0].description}
		Temperature: ${data.main.temp} (feels like ${data.main.feels_like})
		Humidity: ${data.main.humidity}%
		Wind speed: ${data.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printForecast };
