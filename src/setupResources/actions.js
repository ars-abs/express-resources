import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import { getOptions } from '../helpers/pagination';
import validate from '../validate';

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

const read = async (context) => {
	const { name, models, config: { resources }, data: { id }} = context;
	const model = models[name];
	const data = validate(context) && await model.findOne({
		where: { id },
		include: getIncludes({ name, resources, models }),
	});

	return data ? { data } : { error: { message: 'ID not found.' }};
};

const list = (context) => {
	const isValid = validate(context);

	return isValid
		? getData(context)
		: { error: { message: 'Invalid request.' }};
};

const create = async (context) => {
	const { data: { payload }, name, models } = context;
	const isValid = validate(context);
	const model = models[name];

	return isValid
		? {	data: await model.create({ ...payload, id: getUUID() }) }
		: { error: { message: 'Invalid Data' }};
};

const update = async (context) => {
	const { data: { id, payload }, name, models } = context;
	const isValid = validate(context);
	const model = models[name];
	const [
		isUpdated,
		[{ dataValues }],
	] = await model.update(payload, { where: { id }, returning: true });

	return isValid
		? isUpdated
			? { data: dataValues }
			: { error: { message: 'Invalid ID.' }}
		: { error: { message: 'Invalid data.' }};
};

const remove = async (context) => {
	const { data: { id }, name, models } = context;
	const model = models[name];

	const isRemoved = validate(context)
		&& await model.destroy({ where: { id }});

	return isRemoved ? { data: { id }} : { error: { message: 'Invalid ID' }};
};

export default {
	read,
	list,
	create,
	update,
	remove,
};
