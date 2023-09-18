import { pipe } from './helpers';
import denormalize from './denormalize';
import includeStore from './includeStore';
import exportResources from './exportResources';

const init = (context) => pipe([
	denormalize,
	includeStore,
	exportResources,
], context);

export default init;
