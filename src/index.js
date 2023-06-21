import genResourceEndpoint from './resources/genResourceEndpoint';
import buildEntities from './buildEntities';
import syncEntities from './syncEntities';
import { mapAsync, pipe } from './helpers';
import buildCRUD from './buildCRUD';
import buildContext from './buildContext';

const expressResources = async (context) => {
	const enrichContext = await pipe([
		buildEntities,
		syncEntities,
		buildCRUD,
	], buildContext(context));

	const { config: { resources }} = enrichContext;

	await mapAsync(resources, (resource) =>
		genResourceEndpoint({ ...enrichContext, data: { ...resource }}));
};

export { expressResources };
