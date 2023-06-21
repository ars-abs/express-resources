import normalizeConfig from './normalizeConfig';
import genResourceEndpoint from './resources/genResourceEndpoint';
import buildEntities from './buildEntities';
import syncEntities from './syncEntities';
import { mapAsync, pipe } from './helpers';
import buildCRUD from './buildCRUD';

const expressResources = async (context) => {
	const normalizedContext = { ...context, config: normalizeConfig(context) };

	const enrichContext = await pipe([
		buildEntities, syncEntities, buildCRUD,
	], normalizedContext);

	const { config: { resources }} = enrichContext;

	await mapAsync(resources, (resource) =>
		genResourceEndpoint({ ...enrichContext, data: { ...resource }}));
};

export { expressResources };
