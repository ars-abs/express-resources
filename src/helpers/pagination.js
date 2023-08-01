import { map } from '@laufire/utils/collection';

const getOptions = ({
	config: { resources }, data, repo: { name },
}) => {
	const { pagination = {}} = resources[name];
	const { offset: offsetVal, limit: limitVal, order: orderVal } = pagination;

	const defaultValues = {
		offset: offsetVal?.default,
		limit: limitVal?.default,
		order: orderVal?.default,
	};
	const { offset, limit, order } = { ...defaultValues, ...data };

	return {
		offset: offset,
		limit: limit,
		order: orderVal && map(orderVal.orders[order],
			({ field, direction }) => [field, direction]),
	};
};

const getMeta = ({ data: { count, offset, limit, path }}) => {
	const nextOffset = offset + limit;

	return {
		totalCount: count,
		next: nextOffset < count && `${ path }?limit=${ limit }&offset=${ nextOffset }`,
	};
};

export {
	getMeta,
	getOptions,
};
