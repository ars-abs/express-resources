import { map } from '@laufire/utils/collection';
import normalizeResource from './normalizeResource';

const normalizeConfig = ({ config }) => {
	const { resources, schemaExtensions } = config;

	return {
		...config,
		resources: map(resources, (resource, key) =>
			normalizeResource({ resource, key, schemaExtensions })),
	} ;
};

export default normalizeConfig;
