import { pipe } from '../helpers';
import buildModels from './buildModels';
import makeRelations from './makeRelations';
import syncModels from './syncModels';
import buildValidators from './buildValidators';

const setupResources = (context) => pipe([
	buildModels,
	syncModels,
	makeRelations,
	syncModels,
	buildValidators,
], context);

export default setupResources;
