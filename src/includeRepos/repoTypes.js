import { Sequelize } from 'sequelize';

const freezeTableName = {
	define: {
		freezeTableName: true,
	},
};

const repoTypes = {
	sqlite: ({ path }) => new Sequelize({
		dialect: 'sqlite',
		storage: path,
		logging: false,
		...freezeTableName,
	},),
	postgres: ({ userName, password, dataBase, ...rest }) => new Sequelize(
		dataBase,
		userName,
		password,
		{
			dialect: 'postgres',
			logging: false,
			...rest,
			...freezeTableName,
		},
	),
	mysql: ({ userName, password, dataBase, ...rest }) => new Sequelize(
		dataBase,
		userName,
		password,
		{
			dialect: 'mysql',
			logging: false,
			...rest,
			...freezeTableName,
		},
	),
};

export default repoTypes;
