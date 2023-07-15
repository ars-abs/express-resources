import { pipe } from '../helpers';
import buildEntities from './buildEntities';
import makeRelations from './makeRelations';
import syncEntities from './syncEntities';

const setupResources = (context) => pipe([
	buildEntities,
	syncEntities,
	makeRelations,
	syncEntities,
], context);

export default setupResources;
