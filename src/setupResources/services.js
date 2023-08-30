import validate from './validate';
import store from './store';

const read = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'ID not found.' }};
};

const list = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'Invalid request.' }};
};

const create = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'Invalid Data' }};
};

const update = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { ...data } : { error: { message: 'Invalid data.' }};
};

const remove = async (context) => {
	const { data: { id }} = context;
	const isRemoved = validate(context) && await store(context);

	return isRemoved ? { data: { id }} : { error: { message: 'Invalid ID' }};
};

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
