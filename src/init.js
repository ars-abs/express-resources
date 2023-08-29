import { pipe } from './helpers';
import denormalize from './denormalize';
import includeServices from './includeServices';
import includeStore from './includeStore';
import setupRoutes from './setupRoutes';
import exportResources from './exportResources';

const init = (context) => pipe([
	denormalize,
	includeServices,
	includeStore,
	setupRoutes,
	exportResources,
], context);

export default init;
