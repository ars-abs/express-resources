import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import { getOptions } from '../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const getData = async (context) => {
	const { name, models, config: { resources }} = context;
	const model = models[name];
	const options = {
		...getOptions(context),
		include: getIncludes({ name, resources, models }),
	};
	const { count, rows } = await model.findAndCountAll(options);
	const { limit, offset } = options;
	const nextOffset = limit + offset;
	const meta = { limit: limit, offset: nextOffset, totalCount: count };
	const data = map(rows, (row) => row.dataValues);

	return { meta, data };
};

const read = async ({ name, data: { id }, models, config: { resources }}) => {
	const model = models[name];
	const data = await model.findOne({
		where: { id },
		include: getIncludes({ name, resources, models }),
	});

	return data ? { data } : { error: { message: 'ID not found.' }};
};

const list = (context) => {
	const { meta, name, validators } = context;
	const isValid = validators[name].query(meta);

	return isValid
		? getData(context)
		: { error: { message: 'Invalid request.' }};
};

const create = async ({ data: { payload }, name, validators, models }) => {
	const isValid = validators[name].body(payload);
	const model = models[name];

	return isValid
		? {
			data: await model.create({ ...payload, id: getUUID() }),
		}
		: { error: { message: 'Invalid Data' }};
};

const update = async ({ data: { id, payload }, name, validators, models }) => {
	const isValid = validators[name].body(payload);
	const model = models[name];

	return isValid
		? {
			data: await model.update(payload, { where: { id }})
			&& await model.findOne({ where: { id }}),
		}
		: { error: { message: 'Invalid data.' }};
};

const remove = async ({ data: { id }, name, models }) => {
	const model = models[name];

	const isRemoved = await model.destroy({ where: { id }});

	return isRemoved ? { data: { id }} : { error: { message: 'Invalid ID' }};
};

export default {
	read,
	list,
	create,
	update,
	remove,
};
