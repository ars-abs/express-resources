import { keys, select } from '@laufire/utils/collection';
import { getValidQuery } from '../../helpers';

const create = async ({ body, context }, res) => {
	const { config: { resources }, service, data: { name }} = context;
	const { repoSchema } = resources[name];
	const sanitizedData = select(body, keys(repoSchema));
	const response = await service.create({
		...context,
		data: { sanitizedData },
	});
	const notFound = 404;
	const created = 201;

	res.status(response.error ? notFound : created);
	res.json(response);
};

const get = async ({ context, params: { id }}, res) => {
	const response = await context.service.get({ ...context, data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const getAll = async ({ context, path, query }, res) => {
	const response = await context.service.getAll({
		...context,
		data: { ...getValidQuery(query), path },
	});
	const badRequest = 400;
	const success = 200;

	res.status(response.error ? badRequest : success);
	res.json(response);
};

const remove = async ({ params: { id }, context }, res) => {
	const response = await context.service.remove({ ...context, data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const update = async ({ body, params: { id }, context }, res) => {
	const { config: { resources }, service, data: { name }} = context;
	const { repoSchema } = resources[name];
	const data = select(body, keys(repoSchema));
	const response = await service.update({ ...context, data: { id, data }});
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
