import { merge } from '@laufire/utils/collection';
import { mapAsync } from '../../helpers';
import { get, getAll, create, update, remove } from './services';

const buildServices = async (context) => ({
	services: await mapAsync(context.models, (db, name) => ({
		get: (props) =>	get(merge(
			context, props, { data: { db, name }}
		)),
		getAll: (props) => getAll(merge(
			context, props, { data: { db, name }}
		)),
		create: (props) => create(merge(
			context, props, { data: { db, name }}
		)),
		update: (props) => update(merge(
			context, props, { data: { db, name }}
		)),
		remove: (props) => remove(merge(
			context, props, { data: { db, name }}
		)),
	})),
});

export default buildServices;
