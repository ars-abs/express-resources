import { keys, select } from '@laufire/utils/collection';
import respond from '../../responses/respond';
import responses from '../../responses';

const create = async ({
	body,
	context: {
		config: { resources }, repo, data: { name },
	},
}, res) => {
	const { schema } = resources[name];
	const sanitizedData = select(body, keys(schema));
	const createdData = await repo.create(sanitizedData);

	respond({ res: res, statusCode: 201, data: createdData });
};

const get = async ({ context: { repo }, params: { id }}, res) => {
	const data = await repo.get(id);

	data
		? respond({ res: res, statusCode: 200, data: data })
		: responses.sendNotFoundedResponse(res);
};

const getAll = async (req, res) => {
	const { context: { repo }} = req;
	const data = await repo.getAll(req);

	respond({ res: res, statusCode: 200, ...data });
};

const remove = async ({ params: { id }, context: { repo }}, res) => {
	const target = await repo.get(id);

	target
		? responses.removeAndSendResponse({ res, repo, id })
		: responses.sendNotFoundedResponse(res);
};

const update = async ({ body, params: { id }, context: {
	config: { resources }, repo, data: { name },
}}, res
) => {
	const { schema } = resources[name];
	const data = select(body, keys(schema));
	const target = await repo.get(id);
	const updated = await repo.update(id, data);

	target && updated
		? respond({
			res: res,
			statusCode: 200,
			message: 'Updated successfully',
			data: updated,
		})
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
