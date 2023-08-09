import { pipe } from './helpers';
import enrichContext from './enrichContext';
import setupResources from './setupResources';
import setupRoutes from './setupRoutes';
import extendSchema from './enrichContext/extendSchema';

const expressResources = (context) => pipe([
	extendSchema,
	enrichContext,
	setupResources,
	setupRoutes,
], context);

export { expressResources };
