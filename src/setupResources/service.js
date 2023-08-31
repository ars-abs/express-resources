import validate from './validate';

const service = (context) => {
	const { store } = context;
	const { error } = validate(context);

	return error ? { error } : store(context);
};

export default service;
