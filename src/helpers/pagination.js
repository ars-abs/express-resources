import { map } from '@laufire/utils/collection';

const getOptions = ({
	req: { query, context: { config: { resources }}},
	name,
}) => {
	const { pagination = {}} = resources[name];
	const { offset: offsetVal, limit: limitVal, order: orderVal } = pagination;

	const defaultValues = {
		offset: offsetVal?.default,
		limit: limitVal?.default,
		order: orderVal?.default,
	};
	const { offset, limit, order } = { ...defaultValues, ...query };

	return {
		offset: offset,
		limit: limit,
		order: orderVal && map(orderVal.orders[order],
			({ field, direction }) => [field, direction]),
	};
};

const getMeta = ({ req, data: { count, offset, limit }}) => {
	const nextOffset = Number(offset) + Number(limit);

	return {
		totalCount: count,
		next: nextOffset < count && `${ req.path }?limit=${ limit }&offset=${ nextOffset }`,
	};
};
const pagination = {
	getMeta,
	getOptions,
};

export default pagination;
