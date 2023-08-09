import { map } from '@laufire/utils/collection';
import enrichResource from './enrichResource';

const enrichResources = ({ config }) => {
	const { resources } = config;

	return {
		config: {
			resources: map(resources, (resource, key) =>
				enrichResource({ resource, key })),
		},
	} ;
};

export default enrichResources;
