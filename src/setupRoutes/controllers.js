import { getMeta } from '../helpers/pagination';

// TODO: Handle NOT FOUND and BAD REQUEST properly.
// TODO: Define I/O structure for service.
const create = async ({ body: payload, context }, res) => {
	const action = 'create';
	const { service, resource: { name }} = context;
	const data = { payload };
	const response = await service({ ...context, name, action, data });
	const notFound = 404;
	const created = 201;

	res.status(response.error ? notFound : created);
	res.json(response);
};

const read = async ({ context, params: { id }}, res) => {
	const action = 'read';
	const { service, resource: { name }} = context;
	const data = { id };
	const response = await service({ ...context, name, action, data });
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const list = async ({ context, path, query }, res) => {
	const action = 'list';
	const { service, resource: { name }} = context;
	const meta = { ...query, path };
	const response = await service({ ...context, name, action, meta });
	const { error } = response;
	const badRequest = 400;
	const success = 200;
	const result = error
		? response
		: { ...response, meta: getMeta({ ...response.meta, path }) };

	res.status(error ? badRequest : success);
	res.json(result);
};

const remove = async ({ params: { id }, context }, res) => {
	const action = 'remove';
	const { service, resource: { name }} = context;
	const data = { id };
	const response = await service({ ...context, name, action, data });
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const update = async ({ body: payload, params: { id }, context }, res) => {
	const action = 'update';
	const { service, resource: { name }} = context;
	const data = { id, payload };
	const response = await service({ ...context, name, action, data });
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
