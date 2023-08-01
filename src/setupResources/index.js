import { pipe } from '../helpers';
import buildModels from './buildModels';
import makeRelations from './makeRelations';
import syncModels from './syncModels';
import buildServices from './buildServices';

const setupResources = (context) => pipe([
	buildModels,
	syncModels,
	makeRelations,
	syncModels,
	buildServices,
], context);

export default setupResources;
