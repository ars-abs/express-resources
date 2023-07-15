import { mapAsync } from '../../helpers';
import operations from './operations';

const buildCRUD = async (context) => {
	const { models } = context;

	return {
		repoCRUD: await mapAsync(models, (db, name) => ({
			get: (id) => operations.get({ ...context, db, name, id }),
			getAll: (req) => operations.getAll({ ...context, db, name, req }),
			create: (data) => operations.create({ ...context, db, name, data }),
			update: (id, data) => operations.update({
				...context, db, name, id, data,
			}),
			remove: (id) => operations.remove({ ...context, db, name, id }),
		})),
	};
};

export default buildCRUD;
