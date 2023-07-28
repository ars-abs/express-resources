import { keys, select } from '@laufire/utils/collection';
import respond from '../../helpers/responses/respond';

const create = async ({ body, context }, res) => {
	const { config: { resources }, repo, data: { name }} = context;
	const { repoSchema } = resources[name];
	const sanitizedData = select(body, keys(repoSchema));
	const response = await repo.create({
		...context,
		data: { sanitizedData },
	});
	const notFound = 404;
	const created = 201;

	res.status(response.error ? notFound : created);
	res.json(response);
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

const remove = async ({ params: { id }, context }, res) => {
	const response = await context.repo.remove({ ...context, data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const update = async ({ body, params: { id }, context }, res) => {
	const { config: { resources }, repo, data: { name }} = context;
	const { repoSchema } = resources[name];
	const data = select(body, keys(repoSchema));
	const response = await repo.update({ ...context, data: { id, data }});
	const notFound = 404;
	const updated = 200;

	res.status(response.error ? notFound : updated);
	res.json(response);
};

export {
	create,
	get,
	getAll,
	update,
	remove,
};
