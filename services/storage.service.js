import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city',
};

const parseFile = async () => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data;
	}
	return {};
};

const saveKeyValue = async (key, value) => {
	const data = await parseFile();
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async key => {
	const data = await parseFile();
	return data[key];
};

const isExist = async path => {
	try {
		await promises.stat(path);
		return true;
	} catch (error) {
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
