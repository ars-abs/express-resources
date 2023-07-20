import { map, merge } from '@laufire/utils/collection';
import { convertSchema } from '../../lib/types';

const translateSchema = ({ properties, ...rest }) => ({
	...rest,
	properties: map(properties, (props) => (props.format === 'ref'
		? { ...props, format: 'uuid' }
		: props)),
});

const normalizeResource = ({ resource, key, schemaExtensions }) => {
	const { schema, name = key } = resource;
	const extendedSchema = merge({ properties: schemaExtensions }, schema);
	const translatedSchema = translateSchema(extendedSchema);

	return {
		...resource,
		name: name,
		repoSchema: convertSchema({ ...translatedSchema, id: `${ name }` }).props,
		schema: extendedSchema,
	};
};

export default normalizeResource;
