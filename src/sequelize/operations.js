import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import getTranslatedData from './getTranslatedData';
import pagination from '../helpers/pagination';

const get = async ({ db, id }) =>
	getTranslatedData(await db.findOne({ where: { _id: id }}));

const getAll = async (context) => {
	const { db } = context;
	const options = pagination.getOptions(context);
	const { count, rows } = await db.findAndCountAll(options);
	const meta = pagination.getMeta({ ...context, data: { ...options, count }});
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
