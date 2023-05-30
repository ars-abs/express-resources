import { convertSchema } from 'json-schema-sequelizer/lib/types';

const normalizeResource = ({ resource, schemaExtensions }) => {
	const { schema, name } = resource;
	const extendedSchema = {
		...schema,
		id: `${ name }`,
		properties: { ...schema.properties, ...schemaExtensions },
	};

	return {
		...resource,
		schema: convertSchema(extendedSchema).props,
	};
};

export default normalizeResource;
