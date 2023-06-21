import operations from './operations';

const sequelize = ({ entities, data: { name }}) => {
	const db = entities[name];

	return {
		get: (id) => operations.get({ db, id }),
		getAll: (req) => operations.getAll({ req, db }),
		create: (data) => operations.create({ db, data }),
		update: (id, data) => operations.update({ db, id, data }),
		remove: (id) => operations.remove({ db, id }),
	};
};

export default sequelize;
