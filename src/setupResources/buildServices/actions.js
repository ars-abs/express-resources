import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import { getOptions } from '../../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const getData = async (context) => {
	const { repo: { name, db }, models, config: { resources }} = context;
	const options = {
		...getOptions(context),
		include: getIncludes({ name, resources, models }),
	};
	const { count, rows } = await db.findAndCountAll(options);
	const { limit, offset } = options;
	const nextOffset = limit + offset;
	const meta = { limit: limit, offset: nextOffset, totalCount: count };
	const data = map(rows, (row) => row.dataValues);

	return { meta, data };
};

const read = async ({
	repo: { db, name }, data: { id }, models, config: { resources },
}) => {
	const data = await db.findOne({
		where: { id },
		include: getIncludes({ name, resources, models }),
	});

	return data ? { data } : { error: { message: 'ID not found.' }};
};

const list = (context) => {
	const { meta, repo: { name }, validators } = context;
	const isValid = validators[name].query(meta);

	return isValid
		? getData(context)
		: { error: { message: 'Invalid request.' }};
};

const create = async ({
	data: { payload }, repo: { db, name }, validators,
}) => {
	const isValid = validators[name].body(payload);

	return isValid
		? {
			data: await db.create({ ...payload, id: getUUID() }),
		}
		: { error: { message: 'Invalid Data' }};
};

const update = async ({
	data: { id, payload }, repo: { db, name }, validators,
}) => {
	const isValid = validators[name].body(payload);

	return isValid
		? {
			data: await db.update(payload, { where: { id }})
			&& await db.findOne({ where: { id }}),
		}
		: { error: { message: 'Invalid data.' }};
};

const remove = async ({ data: { id }, repo: { db }}) => {
	const isRemoved = await db.destroy({ where: { id }});

	return isRemoved ? { data: { id }} : { error: { message: 'Invalid ID' }};
};

export default {
	read,
	list,
	create,
	update,
	remove,
};
