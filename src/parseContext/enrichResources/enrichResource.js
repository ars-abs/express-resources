import { convertSchema } from '../../lib/types';
import extendPagination from './extendPagination';
import translateSchema from './translateSchema';

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
