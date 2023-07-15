import { map } from '@laufire/utils/collection';
import { Sequelize, DataTypes } from 'sequelize';

const buildEntities = ({ repos, config: { resources }}) => ({
	entities: map(resources, ({ name, indexes, schema, repo: repoName }) => {
		const repo = repos[repoName];
		const primaryKey = { id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		}};

		return repo.define(
			name, { ...primaryKey, ...schema }, { indexes }
		);
	}),
});

export default buildEntities;
