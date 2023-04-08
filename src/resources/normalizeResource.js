import repoStandards from '../sequelize/repoStandards';
import { convertSchema } from 'json-schema-sequelizer/lib/types';

const normalizeResource = ({ resource, repos, schemaExtensions }) => {
	const { repo, schema, name } = resource;
	const extendedSchema = {
		...schema,
		id: `${ name }`,
		properties: { ...schema.properties, ...schemaExtensions },
	};

	return {
		...resource,
		repo: repoStandards[typeof repo]({ repo, repos }),
		schema: convertSchema(extendedSchema).props,
	};
};

export default normalizeResource;
