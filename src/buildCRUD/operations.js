import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import pagination from '../helpers/pagination';

const get = ({ db, id }) => db.findOne({ where: { id }});

const getAll = async (context) => {
	const { db } = context;
	const options = pagination.getOptions(context);
	const { count, rows } = await db.findAndCountAll(options);
	const meta = pagination.getMeta({ ...context, data: { ...options, count }});
	const data = map(rows, (row) => row.dataValues);

	return { meta, data } ;
};

const create = ({ db, data }) => db.create({ ...data, id: getUUID() });

const update = async ({ db, id, data }) => {
	await db.update(data, { where: { id }});
	return db.findOne({ where: { id }});
};

const remove = ({ db, id }) => db.destroy({ where: { id }});

const operations = {
	get,
	getAll,
	create,
	update,
	remove,
};

export default operations;
