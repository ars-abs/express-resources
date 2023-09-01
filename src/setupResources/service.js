const service = (context) => {
	const { store, validate } = context;
	const { error } = validate(context);

	return error ? { error } : store(context);
};

export default service;
