import genResourceEndpoint from './resources/genResourceEndpoint';
import buildEntities from './buildEntities';
import syncEntities from './syncEntities';
import { pipe } from './helpers';
import buildCRUD from './buildCRUD';
import buildContext from './buildContext';
import buildValidators from './buildValidators';
import makeRelations from './makeRelations';

const expressResources = (context) => pipe([
	buildEntities,
	makeRelations,
	syncEntities,
	buildCRUD,
	buildValidators,
	genResourceEndpoint,
], buildContext(context));

export { expressResources };
