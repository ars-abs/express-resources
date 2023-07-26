import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import pagination from '../../helpers/pagination';

const getIncludes = ({ name, resources, models }) => {
	const { includes = [] } = resources[name];

	return map(includes, (modelName) => models[modelName]);
};

const get = ({
	db, id, name, models, config: { resources },
}) => db.findOne({
	where: { id },
	include: getIncludes({ name, resources, models }),
});

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

const create = ({ db, data }) => db.create({ ...data, id: getUUID() });

const update = async ({ db, id, data }) => {
	await db.update(data, { where: { id }});
	return db.findOne({ where: { id }});
};

const remove = ({ db, id }) => db.destroy({ where: { id }});

export {
	get,
	getAll,
	create,
	update,
	remove,
};
