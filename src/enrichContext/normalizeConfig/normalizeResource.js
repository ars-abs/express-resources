import { keys, map, merge } from '@laufire/utils/collection';
import { convertSchema } from '../../lib/types';

const translateSchema = ({ properties, ...rest }) => ({
	...rest,
	properties: map(properties, (props) => (props.format === 'ref'
		? { ...props, format: 'uuid' }
		: props)),
});
const extendPagination = (pagination) => {
	const { order, limit, offset } = pagination;
	const { orders, ...rest } = order;
	const querySchema = {
		type: 'object',
		properties: {
			offset: offset,
			limit: limit,
			order: {
				...rest,
				type: 'string',
				enum: keys(orders),
			},
		},
	};

	return { ...pagination, querySchema };
};

const normalizeResource = ({ resource, key, schemaExtensions }) => {
	const { schema, name = key, pagination } = resource;
	const extendedSchema = merge({ properties: schemaExtensions }, schema);
	const translatedSchema = translateSchema(extendedSchema);

	return {
		...resource,
		name: name,
		pagination: extendPagination(pagination),
		repoSchema: convertSchema({ ...translatedSchema, id: `${ name }` }).props,
		schema: extendedSchema,
	};
};

export default normalizeResource;
