import { v4 as getUUID } from 'uuid';
import validate from './validate';
import store from './store';

const read = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'ID not found.' }};
};

const list = async (context) => {
	const isValid = validate(context);

	return isValid
		? { data: await store(context) }
		: { error: { message: 'Invalid request.' }};
};

const create = async (context) => {
	const { data: { payload }, name, models } = context;
	const isValid = validate(context);
	const model = models[name];

	return isValid
		? { data: await model.create({ ...payload, id: getUUID() }) }
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

// eslint-disable-next-line object-shorthand
const actions = {
	read,
	list,
	create,
	update,
	remove,
};

const services = (context) => {
	const { action } = context;

	return actions[action](context);
};

export default services;
