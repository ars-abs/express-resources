import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import getTranslatedData from './getTranslatedData';

const get = async ({ db, id }) =>
	map(await db.findAll({ where: { _id: id }}), getTranslatedData)[0];

const getLimit = ({ limitInp, defaultLimit, maxLimit }) => {
	const finalLimit = limitInp || defaultLimit;

	// TODO: Decide produce error on max limit exceeded or set max limit as limit
	return finalLimit > maxLimit ? maxLimit : finalLimit ;
};

const getAll = async ({
	db, req: {
		query: { page: pageInp, limit: limitInp, order: orderInp },
		context: { data: { pagination: {
			page: { default: defaultPage },
			limit: { default: defaultLimit, max: maxLimit },
			order: { default: defaultOrder, orders },
		}}},
	},
}) => {
	const page = (pageInp || defaultPage) - 1;
	const limit = getLimit({ limitInp, defaultLimit, maxLimit });
	const order = orders[orderInp || defaultOrder];
	const offset = page * limit;
	const options = { limit, offset, order };

	return map(await db.findAll(options), getTranslatedData);
};

const create = async ({ db, data }) =>
	getTranslatedData(await db.create({ ...data, _id: getUUID() }));

const update = async ({ db, id, data }) => {
	await db.update(data, { where: { _id: id }});
	return map(await db
		.findAll({ where: { _id: id }}), getTranslatedData)[0];
};

const remove = ({ db, id }) => db.destroy({ where: { _id: id }});

const operations = {
	get,
	getAll,
	create,
	update,
	remove,
};

export default operations;
