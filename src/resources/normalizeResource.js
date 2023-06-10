const normalizeResource = ({
	resource: { schema, ...rest }, schemaExtensions,
}) => {
	const extendedSchema = {
		...schema,
		properties: { ...schema.properties, ...schemaExtensions },
	};

	return {
		...rest,
		schema: extendedSchema,
	};
};

export default normalizeResource;
