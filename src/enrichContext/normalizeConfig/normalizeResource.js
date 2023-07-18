import { map, merge } from '@laufire/utils/collection';
import { convertSchema } from 'json-schema-sequelizer/lib/types';

const translateSchema = ({ properties, ...rest }) => ({
	...rest,
	properties: map(properties, (props) => (props.format === 'ref'
		? { ...props, format: 'uuid' }
		: props)),
});

const normalizeResource = ({ resource, schemaExtensions }) => {
	const { schema, name } = resource;
	const extendedSchema = merge({ properties: schemaExtensions }, schema);
	const translatedSchema = translateSchema(extendedSchema);

	return {
		...resource,
		repoSchema: convertSchema({ ...translatedSchema, id: `${ name }` }).props,
		schema: extendedSchema,
	};
};

export default normalizeResource;
