import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import getTranslatedData from './getTranslatedData';

const get = async ({ db, id }) =>
	map(await db.findAll({ where: { _id: id }}), getTranslatedData)[0];

const getAll = async ({ db }) =>
	map(await db.findAll(), getTranslatedData);

const create = async ({ db, data }) =>
	getTranslatedData(await db.create({ ...data, _id: getUUID() }));

const update = async ({ db, id, data }) => {
	await db.update(data, { where: { _id: id }});
	return map(await db
		.findAll({ where: { _id: id }}), getTranslatedData)[0];
};

const remove = ({ db, id }) => db.destroy({ where: { _id: id }});

const operations = {
	get,
	getAll,
	create,
	update,
	remove,
};

export default operations;
