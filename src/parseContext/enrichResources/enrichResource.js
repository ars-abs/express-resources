import { keys, map } from '@laufire/utils/collection';
import { convertSchema } from '../../lib/types';

const translateSchema = ({ properties, ...rest }) => ({
	...rest,
	properties: map(properties, (props) => (props.format === 'ref'
		? { ...props, format: 'uuid' }
		: props)),
});
const defaultSchema = {
	offset: { type: 'number' },
	limit: { type: 'number' },
	order: { type: 'string' },
};
const extendPagination = (pagination) => {
	const { order, ...rest } = pagination;
	const resolvedSchema = { ...defaultSchema, ...rest };
	const orderSchema = order && order.orders
		? { type: 'string', enum: keys(order.orders) }
		: defaultSchema.order;
	const querySchema = {
		type: 'object',
		properties: {
			...resolvedSchema,
			order: orderSchema,
		},
	};

	return { ...pagination, querySchema };
};

const enrichResource = ({ resource }) => {
	const { schema, name, pagination = {}} = resource;
	const translatedSchema = translateSchema(schema);

	return {
		...resource,
		pagination: extendPagination(pagination),
		repoSchema: convertSchema({ ...translatedSchema, id: `${ name }` }).props,
	};
};

export default enrichResource;
