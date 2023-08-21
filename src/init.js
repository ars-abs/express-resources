import denormalize from './denormalize';
import exportResources from './exportResources';
import { pipe } from './helpers';
import includeActions from './parseContext/includeActions';
import setupRoutes from './setupRoutes';

const init = (context) => pipe([
	denormalize,
	includeActions,
	setupRoutes,
	exportResources,
], context);

export default init;
