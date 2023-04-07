import { DataTypes } from 'sequelize';
import operations from './operations';
import sequelizeRepoTypes from './sequelizeRepoTypes';

const sequelize = ({ name, schema, repoOptions: { type, ...rest }}) => {
	const modal = sequelizeRepoTypes[type](rest);
	const db = modal.define(name, { ...schema, _id: DataTypes.STRING });

	db.sync({ alter: true });

	return {
		get: (id) => operations.get({ db, id }),
		getAll: () => operations.getAll({ db }),
		create: (data) => operations.create({ db, data }),
		update: (id, data) => operations.update({ db, id, data }),
		remove: (id) => operations.remove({ db, id }),
	};
};

export default sequelize;
