import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	t: 'token',
	s: 'city',
};

const parseFile = async () => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data;
	}
	return {};
};

const saveKeyValue = async obj => {
	const data = await parseFile();
	Object.keys(obj).map(key => (data[TOKEN_DICTIONARY[key]] = obj[key]));
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
