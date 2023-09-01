import { pipe } from './helpers';
import denormalize from './denormalize';
import includeValidate from './includeValidate';
import includeService from './includeService';
import includeStore from './includeStore';
import setupRoutes from './setupRoutes';
import exportResources from './exportResources';

const init = (context) => pipe([
	denormalize,
	includeValidate,
	includeService,
	includeStore,
	setupRoutes,
	exportResources,
], context);

export default init;
