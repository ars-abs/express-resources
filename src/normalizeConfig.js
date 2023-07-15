import { map } from '@laufire/utils/collection';
import normalizeResource from './setup/setupRoutes/resources/normalizeResource';

const normalizeConfig = ({ config }) => {
	const { resources, schemaExtensions } = config;

	return {
		...config,
		resources: map(resources, (resource) =>
			normalizeResource({ resource, schemaExtensions })),
	} ;
};

export default normalizeConfig;
