import normalizeConfig from './normalizeConfig';
import genResourceEndpoint from './resources/genResourceEndpoint';
import buildEntities from './buildEntities';
import syncEntities from './syncEntities';
import { mapAsync } from './helpers';

const expressResources = async (context) => {
	const normalizedContext = { ...context, config: normalizeConfig(context) };

	const enrichContext = {
		...normalizedContext,
		...buildEntities(normalizedContext),
	};

	await syncEntities(enrichContext);
	const { config: { resources }} = enrichContext;

	await mapAsync(resources, (resource) =>
		genResourceEndpoint({ ...enrichContext, data: { ...resource }}));
};

export { expressResources };
