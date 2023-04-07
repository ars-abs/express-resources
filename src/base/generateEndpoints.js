import { map } from '@laufire/utils/collection';
import genResourceEndpoint from '../resources/genResourceEndpoint';

const generateEndpoints = (context) => {
	const { config: { resources }} = context;

	map(resources, (resource) =>
		genResourceEndpoint({ ...context, data: { ...resource }}));
};

export default generateEndpoints;
