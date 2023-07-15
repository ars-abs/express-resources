import { pipe } from '../helpers';
import buildEntities from './buildEntities';
import makeRelations from './makeRelations';
import syncEntities from './syncEntities';
import buildCRUD from './buildCRUD';

const setupResources = (context) => pipe([
	buildEntities,
	syncEntities,
	makeRelations,
	syncEntities,
	buildCRUD,
], context);

export default setupResources;
