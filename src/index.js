import { pipe } from './helpers';
import parseContext from './parseContext';
import setupResources from './setupResources';
import setupRoutes from './setupRoutes';

const expressResources = (context) => pipe([
	parseContext,
	setupResources,
	setupRoutes,
], context);

export { expressResources };
