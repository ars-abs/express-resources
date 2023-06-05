import { DataTypes } from 'sequelize';
import operations from './operations';

const sequelize = ({
	repos,
	data: { name, indexes, schema, repo: repoName },
}) => {
	const repo = repos[repoName];
	const db = repo.define(
		name, { ...schema, _id: DataTypes.STRING }, { indexes }
	);

	db.sync({ alter: true });

	return {
		get: (id) => operations.get({ db, id }),
		getAll: (req) => operations.getAll({ req, db }),
		create: (data) => operations.create({ db, data }),
		update: (id, data) => operations.update({ db, id, data }),
		remove: (id) => operations.remove({ db, id }),
	};
};

export default sequelize;
