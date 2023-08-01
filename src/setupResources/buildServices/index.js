import { merge } from '@laufire/utils/collection';
import { mapAsync } from '../../helpers';
import { get, getAll, create, update, remove } from './services';

const buildServices = async (context) => ({
	services: await mapAsync(context.models, (db, name) => ({
		get: (extendedContext) =>	get(merge(
			context, extendedContext, { data: { db, name }}
		)),
		getAll: (extendedContext) => getAll(merge(
			context, extendedContext, { data: { db, name }}
		)),
		create: (extendedContext) => create(merge(
			context, extendedContext, { data: { db, name }}
		)),
		update: (extendedContext) => update(merge(
			context, extendedContext, { data: { db, name }}
		)),
		remove: (extendedContext) => remove(merge(
			context, extendedContext, { data: { db, name }}
		)),
	})),
});

export default buildServices;
