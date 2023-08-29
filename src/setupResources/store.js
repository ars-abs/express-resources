import { map } from '@laufire/utils/collection';
import { getOptions } from '../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const read = async (context) => {
	const { name, models, config: { resources }, data: { id }} = context;
	const model = models[name];

	const res = await model.findOne({
		where: { id },
		include: getIncludes({ name, resources, models }),
	});

	return res;
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

const actions = {
	read,
	list,
};

const store = (context) => {
	const { action } = context;

	return actions[action](context);
};

export default store;
