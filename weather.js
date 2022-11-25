#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {
	printError,
	printSuccess,
	printHelp,
	printForecast,
} from './services/log.service.js';
import {
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY,
} from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

const saveToken = async token => {
	if (!token.length) {
		printError('No token provided');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess(`Token ${token} was successfully saved`);
	} catch (error) {
		printError(error.message);
	}
};

const saveCity = async city => {
	if (!city.length) {
		printError('No city provided');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city.toLowerCase());
		printSuccess(`City ${city.toLowerCase()} was successfully saved`);
	} catch (error) {
		printError(error.message);
	}
};

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? (await getKeyValue('city'));
		const weather = await getWeather(city);
		printForecast(weather, getIcon(weather.weather[0].icon));
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('Provided city is not found');
		} else if (error?.response?.status == 404) {
			printError('Provided token is incorrect');
		} else {
			printError(error.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		printHelp();
		return;
	}

	if (args.s) {
		return saveCity(args.s);
	}

	if (args.t) {
		return saveToken(args.t);
		// Saving token
	}
	getForecast();
	// Show weather
};

initCLI();
