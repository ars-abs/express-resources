import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import { getOptions } from '../helpers/pagination';
import { tryCatch } from '../helpers';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const read = async (context) => {
	const { name, models, config: { resources }, data: { id }} = context;
	const model = models[name];

	const data = await model.findOne({
		where: { id },
		include: getIncludes({ name, resources, models }),
	});

	return data
		? { data }
		: { error: { code: 'idNotFound' }};
};

const list = async (context) => {
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

const create = async (context) => {
	const { data: { payload }, name, models } = context;
	const model = models[name];

	return { data: await model.create({ ...payload, id: getUUID() }) };
};

const update = async (context) => {
	const { data: { id, payload }, name, models } = context;
	const model = models[name];
	const [
		isUpdated,
		[updatedData],
	] = await model.update(payload, { where: { id }, returning: true });

	return isUpdated
		? { data: updatedData.dataValues }
		: { error: { code: 'invalidID' }};
};

const remove = async (context) => {
	const { data: { id }, name, models } = context;
	const model = models[name];

	const res = await model.destroy({ where: { id }});

	return res ? { data: { id }} : { error: { code: 'idNotFound' }};
};

const actions = {
	read,
	list,
	create,
	update,
	remove,
};

const store = async (context) => {
	const { action } = context;

	const result = await tryCatch(async () => {
		const response = await actions[action](context);

		return response;
	});

	return result;
};

export default store;
