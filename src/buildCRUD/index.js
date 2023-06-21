import { mapAsync } from '../helpers';
import operations from './operations';

const buildCRUD = async ({ entities }) => ({
	repoCRUD: await mapAsync(entities, (db) => ({
		get: (id) => operations.get({ db, id }),
		getAll: (req) => operations.getAll({ req, db }),
		create: (data) => operations.create({ db, data }),
		update: (id, data) => operations.update({ db, id, data }),
		remove: (id) => operations.remove({ db, id }),
	})),
});

export default buildCRUD;
