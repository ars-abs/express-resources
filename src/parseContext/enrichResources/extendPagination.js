import { keys } from '@laufire/utils/collection';

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

export default extendPagination;
