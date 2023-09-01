import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import { getOptions } from '../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const tryCatch = async (fn) => {
	try {
		const res = await fn();

		return res;
	}
	catch (error) {
		return { error: 'unknownError' };
	}
};

const read = async (context) => {
	const { name, models, config: { resources }, data: { id }} = context;
	const model = models[name];

	const response = await tryCatch(async () => {
		const data = await model.findOne({
			where: { id },
			include: getIncludes({ name, resources, models }),
		});

		return data
			? { data }
			: { error: { code: 'idNotFound' }};
	});

	return response.error ? { error: response.error } : response;
};

const list = async (context) => {
	const { name, models, config: { resources }} = context;
	const model = models[name];
	const options = {
		...getOptions(context),
		include: getIncludes({ name, resources, models }),
	};
	const response = await tryCatch(async () => {
		const { count, rows } = await model.findAndCountAll(options);
		const { limit, offset } = options;
		const nextOffset = limit + offset;
		const meta = { limit: limit, offset: nextOffset, totalCount: count };
		const data = map(rows, (row) => row.dataValues);

		return { meta, data };
	});

	return response.error ? { error: response.error } : response;
};

const create = async (context) => {
	const { data: { payload }, name, models } = context;
	const model = models[name];

	const response = await tryCatch(async () => {
		const data = await model.create({ ...payload, id: getUUID() });

		return { data };
	});

	return response.error ? { error: response.error } : response;
};

const update = async (context) => {
	const { data: { id, payload }, name, models } = context;
	const model = models[name];

	const response = await tryCatch(async () => {
		const [
			isUpdated,
			[updatedData],
		] = await model.update(payload, { where: { id }, returning: true });

		return isUpdated
			? { data: updatedData.dataValues }
			: { error: { code: 'invalidID' }};
	});

	return response.error
		? { error: response.error }
		: response;
};

const remove = async (context) => {
	const { data: { id }, name, models } = context;
	const model = models[name];

	const response = await tryCatch(async () => {
		const data = await model.destroy({ where: { id }});

		return data
			? { data: { id }}
			: { error: { code: 'idNotFound' }};
	});

	return response.error ? { error: response.error } : response;
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
