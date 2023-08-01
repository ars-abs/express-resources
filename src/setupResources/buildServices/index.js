import { merge } from '@laufire/utils/collection';
import { mapAsync } from '../../helpers';
import { get, getAll, create, update, remove } from './operations';

const buildServices = async (context) => {
	const { models } = context;

	return {
		services: await mapAsync(models, (db, name) => ({
			get: (extendedContext) =>
				get(merge(extendedContext, { data: { db, name }})),
			getAll: (extendedContext) =>
				getAll(merge(extendedContext, { data: { db, name }})),
			create: (extendedContext) =>
				create(merge(extendedContext, { data: { db, name }})),
			update: (extendedContext) =>
				update(merge(extendedContext, { data: { db, name }})),
			remove: (extendedContext) =>
				remove(merge(extendedContext, { data: { db, name }})),
		})),
	};
};

export default buildServices;
