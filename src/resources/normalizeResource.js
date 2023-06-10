import { convertSchema } from 'json-schema-sequelizer/lib/types';

const normalizeResource = ({ resource, schemaExtensions }) => {
	const { schema, name } = resource;
	const extendedSchema = {
		...schema,
		properties: { ...schema.properties, ...schemaExtensions },
	};

	return {
		...resource,
		schema: convertSchema({ ...extendedSchema, id: `${ name }` }).props,
		orgSchema: extendedSchema,
	};
};

export default normalizeResource;
