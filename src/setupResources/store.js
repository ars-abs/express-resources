import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import { getOptions } from '../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const read = async (context) => {
	const { name, models, config: { resources }, data: { id }} = context;
	const model = models[name];

	return {
		data: await model.findOne({
			where: { id },
			include: getIncludes({ name, resources, models }),
		}),
	};
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

	const res = await model.create({ ...payload, id: getUUID() });

	return res;
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
		: { error: { message: 'invalidID.' }};
};

const remove = async (context) => {
	const { data: { id }, name, models } = context;
	const model = models[name];

	const res = await model.destroy({ where: { id }});

	return res;
};

const actions = {
	read,
	list,
	create,
	update,
	remove,
};

const store = (context) => {
	const { action } = context;

	return actions[action](context);
};

export default store;
