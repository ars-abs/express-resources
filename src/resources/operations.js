import { equals, keys, select } from '@laufire/utils/collection';
import respond from '../responses/respond';
import responses from '../responses';

const create = async ({ body, context: { repo, data: { schema }}}, res) => {
	const sanitizedData = select(body, keys(schema));
	const createdData = await repo.create(sanitizedData);

	respond({ res: res, statusCode: 201, data: createdData });
};

const get = async ({ context: { repo }, params: { id }}, res) => {
	const data = await repo.get(id);

	data && !equals(data, [])
		? respond({ res: res, statusCode: 200, data: data })
		: responses.sendNotFoundedResponse(res);
};

const getAll = async ({ context: { repo }}, res) => {
	const data = await repo.getAll();

	respond({
		res: res, statusCode: 200, results: data.length, data: data,
	});
};

const remove = async ({ params: { id }, context: { repo }}, res) => {
	const target = await repo.get(id);

	target && !equals(target, [])
		? responses.removeAndSendResponse({ res, repo, id })
		: responses.sendNotFoundedResponse(res);
};

const update = async (
	{
		body,
		params: { id },
		context: { repo, data: { schema }},
	},
	res
) => {
	const data = select(body, keys(schema));
	const target = await repo.get(id);

	target && !equals(target, [])
		? responses.updateAndSendResponse({ res, repo, id, data })
		: responses.sendNotFoundedResponse(res);
};

const operations = {
	create,
	get,
	getAll,
	update,
	remove,
};

export default operations;
