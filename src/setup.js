import { pipe } from './helpers';
import denormalize from './denormalize';
import buildValidators from './setupResources/buildValidators';
import buildModels from './setupResources/buildModels';
import makeRelations from './setupResources/makeRelations';
import syncModels from './setupResources/syncModels';

const setup = (context) => pipe([
	denormalize,
	buildValidators,
	buildModels,
	syncModels,
	makeRelations,
	syncModels,
], context);

export default setup;
