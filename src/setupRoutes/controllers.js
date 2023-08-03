import { getMeta } from '../helpers/pagination';

// TODO: Handle NOT FOUND and BAD REQUEST properly.
const create = async ({	body, context: { service, repo }}, res) => {
	const response = await service({
		repo: repo,
		action: 'create',
		data: { payload: body },
	});
	const notFound = 404;
	const created = 201;

	res.status(response.error ? notFound : created);
	res.json(response);
};

const get = async ({ context: { service, repo }, params: { id }}, res) => {
	const response = await service({ repo: repo, action: 'get', data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const getAll = async ({ context: { service, repo }, path, query }, res) => {
	const response = await service({
		repo: repo,
		action: 'getAll',
		meta: { ...query, path },
	});
	const { error, meta } = response;
	const badRequest = 400;
	const success = 200;
	const result = error
		? response
		: { ...response, meta: getMeta({ ...meta, path }) };

	res.status(error ? badRequest : success);
	res.json(result);
};

const remove = async ({ params: { id }, context: { service, repo }}, res) => {
	const response = await service({
		repo: repo,
		action: 'remove',
		data: { id },
	});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const update = async ({
	body,
	params: { id },
	context: { service, repo },
}, res) => {
	const response = await service({
		repo: repo,
		action: 'update',
		data: { id: id, payload: body },
	});
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
