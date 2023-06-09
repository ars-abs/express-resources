import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import getTranslatedData from './getTranslatedData';

const get = async ({ db, id }) =>
	map(await db.findAll({ where: { _id: id }}), getTranslatedData)[0];

const getLimit = ({ limitInp, defaultLimit, maxLimit }) => {
	const finalLimit = Number(limitInp) || defaultLimit;

	// TODO: Decide produce error on 'max limit exceeded' or set max limit as limit
	return finalLimit > maxLimit ? maxLimit : finalLimit ;
};

const getPaginationOptions = ({ req: {
	query: { offset: offsetInp, limit: limitInp, order: orderInp },
	context: { data: { pagination: {
		offset: { default: defaultOffset },
		limit: { default: defaultLimit, max: maxLimit },
		order: { default: defaultOrder, orders },
	}}},
}}) => {
	const offset = Number(offsetInp) || defaultOffset;
	const limit = getLimit({ limitInp, defaultLimit, maxLimit });
	const order = map(orders[orderInp || defaultOrder],
		({ field, direction }) => [field, direction]);

	return { limit, offset, order };
};

const getPaginationMeta = ({ req, data: { count, offset, limit }}) => {
	const nextOffset = offset + limit;

	return {
		totalCount: count,
		next: nextOffset < count ? `${ req.path }?limit=${ limit }&offset=${ nextOffset }` : null,
	};
};

const getAll = async (context) => {
	const { db } = context;
	const options = getPaginationOptions(context);
	const { count, rows } = await db.findAndCountAll(options);
	const meta = getPaginationMeta({ ...context, data: { ...options, count }});
	const data = map(rows, getTranslatedData);

	return { meta, data } ;
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

// https://www.linkedin.com/voyager/api/feed/updatesV2?commentsCount=0&count=9&likesCount=0&moduleKey=home-feed:desktop&paginationToken=871942344-1686189285855-7b42a23216cfb2ee67231bed4e6dda45&q=feed&sortOrder=RELEVANCE&start=10
// https://www.linkedin.com/voyager/api/feed/updatesV2?commentsCount=0&count=9&likesCount=0&moduleKey=home-feed:desktop&paginationToken=871942344-1686189285855-7b42a23216cfb2ee67231bed4e6dda45&q=feed&sortOrder=RELEVANCE&start=19
