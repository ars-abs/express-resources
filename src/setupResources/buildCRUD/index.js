import { mapAsync } from '../../helpers';
import { get, getAll, create, update, remove } from './operations';

const buildCRUD = async (context) => {
	const { models } = context;

	return {
		repoCRUD: await mapAsync(models, (db, name) => ({
			get: (id) => get({ ...context, db, name, id }),
			getAll: (req) => getAll({ ...context, db, name, req }),
			create: (data) => create({ ...context, db, name, data }),
			update: (id, data) => update({
				...context, db, name, id, data,
			}),
			remove: (id) => remove({ ...context, db, name, id }),
		})),
	};
};

export default buildCRUD;
