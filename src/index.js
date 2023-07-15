import { pipe } from './helpers';
import buildContext from './buildContext';
import setupResources from './setupResources';
import setupRoutes from './setupRoutes';

const expressResources = (context) => pipe([
	setupResources,
	setupRoutes,
], buildContext(context));

export { expressResources };
