import { pipeline } from '../helpers';

const service = async (context) => {
	const { validate, store } = context;
	const pipes = [validate, store];
	const process = pipeline(pipes);

	const response = await process(context);

	return response;
};

export default service;
