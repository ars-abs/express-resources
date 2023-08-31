import validate from './validate';

const read = async (context) => {
	const { store } = context;
	const { error } = validate(context);
	const response = error || await store(context);

	return { error, ...response };
};

const list = async (context) => {
	const { store } = context;
	const { error } = validate(context);
	const response = error || await store(context);

	return { error, ...response };
};

const create = async (context) => {
	const { store } = context;
	const { error } = validate(context);
	const response = error || await store(context);

	return { error, ...response };
};

const update = async (context) => {
	const { store } = context;
	const { error } = validate(context);
	const response = error || await store(context);

	return { error, ...response };
};

const remove = async (context) => {
	const { store } = context;
	const { error } = validate(context);
	const response = error || await store(context);

	return { error, ...response };
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
