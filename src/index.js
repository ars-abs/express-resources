import genResourceEndpoint from './resources/genResourceEndpoint';
import { pipe } from './helpers';
import buildCRUD from './buildCRUD';
import buildContext from './buildContext';
import buildValidators from './buildValidators';
import setupResources from './setup/setupResources';

const expressResources = (context) => pipe([
	setupResources,
	buildCRUD,
	buildValidators,
	genResourceEndpoint,
], buildContext(context));

export { expressResources };
