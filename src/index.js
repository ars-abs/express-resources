import { map, values } from '@laufire/utils/collection';
import normalizeConfig from './normalizeConfig';
import genResourceEndpoint from './resources/genResourceEndpoint';

const expressResources = async (context) => {
	const normalizedContext = { ...context, config: normalizeConfig(context) };
	const { config: { resources }} = normalizedContext;

	await Promise.all(map(values(resources), (resource) =>
		genResourceEndpoint({ ...normalizedContext, data: { ...resource }})));
};

export { expressResources };
