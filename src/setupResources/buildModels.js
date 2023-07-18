import { map } from '@laufire/utils/collection';
import { Sequelize, DataTypes } from 'sequelize';

const buildModels = ({ repos, config: { resources }}) => ({
	models: map(resources, ({ name, indexes, repoSchema, repo: repoName }) => {
		const repo = repos[repoName];
		const primaryKey = { id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		}};

		return repo.define(
			name, { ...primaryKey, ...repoSchema }, { indexes }
		);
	}),
});

export default buildModels;
