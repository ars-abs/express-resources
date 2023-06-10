import { map } from '@laufire/utils/collection';
import normalizeConfig from './normalizeConfig';
import genResourceEndpoint from './resources/genResourceEndpoint';

const expressResources = (context) => {
	const normalizedContext = { ...context, config: normalizeConfig(context) };
	const { config: { resources }} = normalizedContext;

	map(resources, (resource) =>
		genResourceEndpoint({ ...normalizedContext, data: { ...resource }}));
};

export { expressResources };
