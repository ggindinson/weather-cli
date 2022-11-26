const getArgs = args => {
	const res = {};
	const [executer, file, ...rest] = args;
	if (['-h', '-s', '-t'].some(option => rest.includes(option))) {
		if (rest.includes('-h')) {
			res.h = true;
		} else {
			if (rest.includes('-t')) {
				res.t = rest[rest.indexOf('-t') + 1];
				rest.splice(rest.indexOf('-t'), 2);
			}

			if (rest.includes('-s')) {
				res.s = rest.slice(rest.indexOf('-s') + 1).join(' ');
			}
		}
	}

	return res;
};

export { getArgs };
