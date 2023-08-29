import denormalize from './denormalize';
import exportResources from './exportResources';
import { pipe } from './helpers';
import includeServices from './parseContext/includeServices';
import setupRoutes from './setupRoutes';

const init = (context) => pipe([
	denormalize,
	includeServices,
	setupRoutes,
	exportResources,
], context);

export default init;
