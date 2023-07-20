import { map } from '@laufire/utils/collection';

// TODO: Decide produce error on 'max limit exceeded' or set max limit as limit
const getValidLimit = ({ limit, maxLimit }) =>
	(limit > maxLimit ? maxLimit : limit) ;

const getOptions = ({
	req: { query, context: { config: { resources }}},
	name,
}) => {
	const { pagination = {}} = resources[name];
	const { offset: offsetVal, limit: limitVal, order: orderVal } = pagination;

	const defaultValues = {
		offset: offsetVal.default,
		limit: limitVal.default,
		order: orderVal.default,
	};
	const { offset, limit, order } = { ...defaultValues, ...query };

	return {
		offset: offset,
		limit: getValidLimit({ limit: limit, maxLimit: limitVal.max }),
		order: orderVal && map(orderVal.orders[order],
			({ field, direction }) => [field, direction]),
	};
};

const getMeta = ({ req, data: { count, offset, limit }}) => {
	const nextOffset = offset + limit;

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
