import { map } from '@laufire/utils/collection';
import enrichResource from './enrichResource';

const enrichResources = ({ config }) => {
	const { resources } = config;

	return {
		config: {
			resources: map(resources, (resource) =>
				enrichResource({ resource })),
		},
	} ;
};

export default enrichResources;
