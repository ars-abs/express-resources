import { map, select } from '@laufire/utils/collection';

const getOptions = ({ config: { resources }, meta, name }) => {
	const { pagination = {}, whiteList = [] } = resources[name];
	const { offset: offsetVal, limit: limitVal, order: orderVal } = pagination;
	const defaultValues = {
		offset: offsetVal?.default,
		limit: limitVal?.default,
		order: orderVal?.default,
	};
	const { offset, limit, order, where } = { ...defaultValues, ...meta };

	return {
		offset: offset,
		limit: limit,
		where: where ? select(JSON.parse(where), whiteList) : {},
		order: orderVal && map(orderVal.orders[order],
			({ field, direction }) => [field, direction]),
	};
};

const getMeta = ({ totalCount, offset, limit, path }) => ({
	totalCount: totalCount,
	next: offset < totalCount && `${ path }?limit=${ limit }&offset=${ offset }`,
});

export {
	getMeta,
	getOptions,
};
