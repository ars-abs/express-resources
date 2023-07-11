import { map } from '@laufire/utils/collection';
import { convertSchema } from 'json-schema-sequelizer/lib/types';

const translateSchema = ({ properties, ...rest }) => ({
	...rest,
	properties: map(properties, (props) => (props.format === 'ref'
		? { ...props, format: 'uuid' }
		: props)),
});

const normalizeResource = ({ resource, schemaExtensions }) => {
	const { schema, name } = resource;
	const extendedSchema = {
		...schema,
		properties: { ...schema.properties, ...schemaExtensions },
	};
	const translatedSchema = translateSchema(extendedSchema);

	return {
		...resource,
		schema: convertSchema({ ...translatedSchema, id: `${ name }` }).props,
		orgSchema: extendedSchema,
	};
};

export default normalizeResource;
