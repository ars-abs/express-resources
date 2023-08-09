import { map } from '@laufire/utils/collection';
import { convertSchema } from '../../lib/types';
import extendPagination from './extendPagination';

const translateSchema = ({ properties, ...rest }) => ({
	...rest,
	properties: map(properties, (props) => (props.format === 'ref'
		? { ...props, format: 'uuid' }
		: props)),
});

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
