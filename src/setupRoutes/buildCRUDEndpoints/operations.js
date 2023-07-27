import { keys, select } from '@laufire/utils/collection';
import respond from '../../helpers/responses/respond';
import responses from '../../helpers/responses';

const create = async ({
	body,
	context: {
		config: { resources }, repo, data: { name },
	},
}, res) => {
	const { repoSchema } = resources[name];
	const sanitizedData = select(body, keys(repoSchema));
	const createdData = await repo.create(sanitizedData);

	respond({ res: res, statusCode: 201, data: createdData });
};

const get = async ({ context, params: { id }}, res) => {
	const response = await context.repo.get({ ...context, data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
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
	const { repoSchema } = resources[name];
	const data = select(body, keys(repoSchema));
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

export {
	create,
	get,
	getAll,
	update,
	remove,
};
