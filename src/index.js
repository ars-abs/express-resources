import genResourceEndpoint from './resources/genResourceEndpoint';
import buildEntities from './buildEntities';
import syncEntities from './syncEntities';
import { pipe } from './helpers';
import buildCRUD from './buildCRUD';
import buildContext from './buildContext';
import buildValidators from './buildValidators';

const expressResources = (context) => pipe([
	buildEntities,
	syncEntities,
	buildCRUD,
	buildValidators,
	genResourceEndpoint,
], buildContext(context));

export { expressResources };
