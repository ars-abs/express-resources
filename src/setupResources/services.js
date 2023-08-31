import validate from './validate';

const services = (context) => {
	const { store } = context;
	const { error } = validate(context);

	return error ? { error } : store(context);
};

export default services;
