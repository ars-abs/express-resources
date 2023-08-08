import { pipe } from '../helpers';
import buildModels from './buildModels';
import makeRelations from './makeRelations';
import syncModels from './syncModels';

const setupResources = (context) => pipe([
	buildModels,
	syncModels,
	makeRelations,
	syncModels,
], context);

export default setupResources;
