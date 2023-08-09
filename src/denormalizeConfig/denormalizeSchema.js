import { map, merge } from '@laufire/utils/collection';

const denormalizeSchema = (schema) => merge(
	{}, schema, {
		properties: map(schema.properties, (property) =>
			merge({ type: 'string' }, property)),
	}
);

export default denormalizeSchema;
