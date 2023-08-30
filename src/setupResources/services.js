import validate from './validate';
import store from './store';

const read = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'idNotFound.' }};
};

const list = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'invalidRequest.' }};
};

const create = async (context) => {
	const data = validate(context) && await store(context);

	return data ? { data } : { error: { message: 'invalidData' }};
};

const update = async (context) => {
	const error = validate(context)
		? undefined
		: { error: { message: 'invalidData' }};
	const response = error || await store(context);

	return { error, ...response };
};

const remove = async (context) => {
	const { data: { id }} = context;
	const isRemoved = validate(context) && await store(context);

	return isRemoved ? { data: { id }} : { error: { message: 'invalidID' }};
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
