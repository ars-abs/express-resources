import { map } from '@laufire/utils/collection';

const getLimit = ({ limitInp, defaultLimit, maxLimit }) => {
	const finalLimit = Number(limitInp) || defaultLimit;

	// TODO: Decide produce error on 'max limit exceeded' or set max limit as limit
	return finalLimit > maxLimit ? maxLimit : finalLimit ;
};

const getOptions = ({ req: {
	query: { offset: offsetInp, limit: limitInp, order: orderInp },
	context: { data: { pagination: {
		offset: { default: defaultOffset },
		limit: { default: defaultLimit, max: maxLimit },
		order: { default: defaultOrder, orders },
	}}},
}}) => {
	const offset = Number(offsetInp) || defaultOffset;
	const limit = getLimit({ limitInp, defaultLimit, maxLimit });
	const order = map(orders[orderInp || defaultOrder],
		({ field, direction }) => [field, direction]);

	return { limit, offset, order };
};

const getMeta = ({ req, data: { count, offset, limit }}) => {
	const nextOffset = offset + limit;

	return {
		totalCount: count,
		next: nextOffset < count ? `${ req.path }?limit=${ limit }&offset=${ nextOffset }` : null,
	};
};
const pagination = {
	getMeta,
	getOptions,
};

export default pagination;
