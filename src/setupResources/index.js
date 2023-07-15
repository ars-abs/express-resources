import { pipe } from '../helpers';
import buildModels from './buildModels';
import makeRelations from './makeRelations';
import syncModels from './syncModels';
import buildCRUD from './buildCRUD';

const setupResources = (context) => pipe([
	buildModels,
	syncModels,
	makeRelations,
	syncModels,
	buildCRUD,
], context);

export default setupResources;
