import {
	keys, length, map, merge, shell, values,
} from '@laufire/utils/collection';

const mapAsync = async (collection, cb) => {
	const collectionKeys = keys(collection);
	const ret = shell(collection);
	const res = await Promise.all(values(map(collection, cb)));
	let index = 0;
	const collectionLength = length(collectionKeys);

	for(let i = 0; i < collectionLength; i++) {
		ret[collectionKeys[i]] = res[index];
		index++;
	}
	return ret;
};

const reduceSync = async (
	collection, reducer, initial,
) => {
	let acc = initial;

	const indexes = keys(collection);
	const indexLength = indexes.length;

	for(let i = 0; i < indexLength; i++) {
		const index = indexes[i];

		// eslint-disable-next-line no-await-in-loop
		acc = await reducer(
			acc, collection[index], index, collection,
		);
	}

	return acc;
};

const runSteps = (steps, data) => reduceSync(
	steps, (acc, step) => {
		step(acc);
		return acc;
	}, data
);

const pipe = (pipes, data) => reduceSync(
	pipes, async (acc, c) => merge(await c(acc) || {}, acc), data,
);

const tryCatch = async (fn) => {
	try {
		const res = await fn();

		return res;
	}
	catch (error) {
		return { error: 'unknownError' };
	}
};

const pipeline = (pipes) =>
	(context) => reduceSync(
		pipes, (acc, fn) => (acc.error ? acc : fn(context)), {}
	);

export {
	mapAsync,
	reduceSync,
	runSteps,
	pipe,
	tryCatch,
	pipeline,
};
