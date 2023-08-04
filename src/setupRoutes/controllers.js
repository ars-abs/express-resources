import { getMeta } from '../helpers/pagination';

// TODO: Handle NOT FOUND and BAD REQUEST properly.
const create = async (
	{	body, context: { service, resource: { name }}}
	, res
) => {
	const response = await service({
		name: name,
		action: 'create',
		data: { payload: body },
	});
	const notFound = 404;
	const created = 201;

	res.status(response.error ? notFound : created);
	res.json(response);
};

const read = async (
	{ context: { service, resource: { name }}, params: { id }}
	, res
) => {
	const response = await service({ name: name, action: 'read', data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const list = async (
	{ context: { service, resource: { name }}, path, query },
	res
) => {
	const response = await service({
		name: name,
		action: 'list',
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

const remove = async (
	{ params: { id }, context: { service, resource: { name }}}
	, res
) => {
	const response = await service({
		name: name,
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
	context: { service, resource: { name }},
}, res) => {
	const response = await service({
		name: name,
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
	read,
	list,
	update,
	remove,
};
