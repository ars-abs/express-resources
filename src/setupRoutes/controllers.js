import { keys, select } from '@laufire/utils/collection';
import { getValidQuery } from '../helpers';

const create = async ({
	body,
	context: { config: { resources }, service, data: { name }},
}, res) => {
	const { repoSchema } = resources[name];
	const sanitizedData = select(body, keys(repoSchema));
	const response = await service.create({ data: { sanitizedData }});
	const notFound = 404;
	const created = 201;

	res.status(response.error ? notFound : created);
	res.json(response);
};

const get = async ({ context: { service }, params: { id }}, res) => {
	const response = await service.get({ data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const getAll = async ({ context: { service }, path, query }, res) => {
	const response = await service.getAll({
		data: { ...getValidQuery(query), path },
	});
	const badRequest = 400;
	const success = 200;

	res.status(response.error ? badRequest : success);
	res.json(response);
};

const remove = async ({ params: { id }, context: { service }}, res) => {
	const response = await service.remove({ data: { id }});
	const notFound = 404;
	const success = 200;

	res.status(response.error ? notFound : success);
	res.json(response);
};

const update = async ({
	body,
	params: { id },
	context: { config: { resources }, service, data: { name }},
}, res) => {
	const { repoSchema } = resources[name];
	const data = select(body, keys(repoSchema));
	const response = await service.update({ data: { id, data }});
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
