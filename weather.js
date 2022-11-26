#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {
	printError,
	printSuccess,
	printHelp,
	printForecast,
} from './services/log.service.js';
import { getKeyValue, saveKeyValue } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

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

const saveValues = async obj => {
	await saveKeyValue(obj);
	Object.keys(obj).map(key =>
		key == 't'
			? printSuccess(`Token ${obj.t} has been successfully saved`)
			: printSuccess(`City ${obj.s} has been successfully saved`)
	);
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		printHelp();
		return;
	} else if (args.s || args.t) {
		return saveValues(args);
	}
	getForecast();
};

initCLI();
