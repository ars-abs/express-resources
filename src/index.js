import { map, values } from '@laufire/utils/collection';
import normalizeConfig from './normalizeConfig';
import genResourceEndpoint from './resources/genResourceEndpoint';
import buildEntities from './buildEntities';
import syncEntities from './syncEntities';

const expressResources = async (context) => {
	const normalizedContext = { ...context, config: normalizeConfig(context) };

	const enrichContext = {
		...normalizedContext,
		...buildEntities(normalizedContext),
	};

	await syncEntities(enrichContext);
	const { config: { resources }} = normalizedContext;

	await Promise.all(map(values(resources), (resource) =>
		genResourceEndpoint({ ...enrichContext, data: { ...resource }})));
};

export { expressResources };
