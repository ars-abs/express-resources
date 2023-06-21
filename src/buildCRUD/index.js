import { mapAsync } from '../helpers';
import operations from './operations';

const buildCRUD = async ({ entities }) => ({
	repoCRUD: await mapAsync(entities, (db, name) => ({
		get: (id) => operations.get({ db, name, id }),
		getAll: (req) => operations.getAll({ db, name, req }),
		create: (data) => operations.create({ db, name, data }),
		update: (id, data) => operations.update({ db, name, id, data }),
		remove: (id) => operations.remove({ db, name, id }),
	})),
});

export default buildCRUD;
