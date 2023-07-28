import { merge } from '@laufire/utils/collection';
import { mapAsync } from '../../helpers';
import { get, getAll, create, update, remove } from './operations';

const buildCRUD = async (context) => {
	const { models } = context;

	return {
		repoCRUD: await mapAsync(models, (db, name) => ({
			get: (extendedContext) =>
				get(merge(extendedContext, { data: { db, name }})),
			getAll: (req) => getAll({ ...context, db, name, req }),
			create: (extendedContext) =>
				create(merge(extendedContext, { data: { db, name }})),
			update: (extendedContext) =>
				update(merge(extendedContext, { data: { db, name }})),
			remove: (extendedContext) =>
				remove(merge(extendedContext, { data: { db, name }})),
		})),
	};
};

export default buildCRUD;
