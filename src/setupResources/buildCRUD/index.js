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
			update: (id, data) => update({
				...context, db, name, id, data,
			}),
			remove: (id) => remove({ ...context, db, name, id }),
		})),
	};
};

export default buildCRUD;
