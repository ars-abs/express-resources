import { pipe } from './helpers';
import enrichContext from './enrichContext';
import setupResources from './setupResources';
import setupRoutes from './setupRoutes';
import extendSchema from './enrichContext/extendSchema';
import denormalizeConfig from './denormalizeConfig';

const expressResources = (context) => pipe([
	extendSchema,
	denormalizeConfig,
	enrichContext,
	setupResources,
	setupRoutes,
], context);

export { expressResources };
