import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import pagination from '../../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const get = async ({
	data: { db, id, name }, models, config: { resources },
}) => {
	const data = await db.findOne({
		where: { id },
		include: getIncludes({ name, resources, models }),
	});

	return data ? { data } : { error: { message: 'ID not found.' }};
};

const getAll = async (context) => {
	const { db, name, models, config: { resources }} = context;
	const options = {
		...pagination.getOptions(context),
		include: getIncludes({ name, resources, models }),
	};
	const { count, rows } = await db.findAndCountAll(options);
	const meta = pagination.getMeta({ ...context, data: { ...options, count }});
	const data = map(rows, (row) => row.dataValues);

	return { meta, data } ;
};

const create = async ({ data: { db, name, sanitizedData }, validators }) => {
	const isValid = validators[name].body(sanitizedData);

	return isValid
		? {
			data: await db.create({ ...sanitizedData, id: getUUID() }),
		}
		: { error: { message: 'Invalid Data' }};
};

const update = async ({ data: { db, id, name, data }, validators }) => {
	const isValid = validators[name].body(data);

	return isValid
		? {
			data: await db.update(data, { where: { id }})
			&& await db.findOne({ where: { id }}),
		}
		: { error: { message: 'Invalid data.' }};
};

const remove = ({ db, id }) => db.destroy({ where: { id }});

export {
	get,
	getAll,
	create,
	update,
	remove,
};
