import { keys, length, map, shell, values } from '@laufire/utils/collection';

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

export {
	mapAsync,
	reduceSync,
	runSteps,
};
