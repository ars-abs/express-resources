import { pipe } from './helpers';
import enrichContext from './enrichContext';
import setupResources from './setupResources';
import setupRoutes from './setupRoutes';

const expressResources = (context) => pipe([
	setupResources,
	setupRoutes,
], enrichContext(context));

export { expressResources };
