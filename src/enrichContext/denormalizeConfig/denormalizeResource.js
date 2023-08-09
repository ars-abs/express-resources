import { merge } from '@laufire/utils/collection';
import denormalizeSchema from './denormalizeSchema';

const defaults = {
	indexes: [],
	includes: [],
	pagination: {
		offset: { type: 'number', default: 0 },
		limit: { type: 'number', default: 25, maximum: 200 },
		order: {
			default: 'default',
			orders: {
				default: [],
			},
		},
	},
};

const overwrites = {
	pagination: {
		offset: { type: 'number' },
		limit: { type: 'number' },
	},
	schema: {
		type: 'object',
	},
};

const denormalizeResource = ({ resource, key: name }) => {
	const processedResource = merge(
		{}, defaults, resource, overwrites
	);
	const schema = denormalizeSchema(processedResource.schema);

	return merge(
		{}, { name }, processedResource, { schema }
	);
};

export default denormalizeResource;
