import { pipe } from '../helpers';
import buildModels from './buildModels';
import makeRelations from './makeRelations';
import syncModels from './syncModels';
import buildValidators from './buildValidators';
import buildServices from './buildServices';

const setupResources = (context) => pipe([
	buildModels,
	syncModels,
	makeRelations,
	syncModels,
	buildValidators,
	buildServices,
], context);

export default setupResources;
