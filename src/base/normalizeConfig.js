import { map } from '@laufire/utils/collection';
import normalizeResource from '../resources/normalizeResource';

const normalizeConfig = ({ config }) => {
	const { resources, repos, schemaExtensions } = config;

	return {
		...config,
		resources: map(resources, (resource) =>
			normalizeResource({ resource, repos, schemaExtensions })),
	} ;
};

export default normalizeConfig;
