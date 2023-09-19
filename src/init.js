import { pipe } from './helpers';
import includeStore from './includeStore';
import exportResources from './exportResources';

const init = (context) => pipe([
	includeStore,
	exportResources,
], context);

export default init;
