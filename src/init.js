import { pipe } from './helpers';
import includeRepos from './includeRepos';
import includeStore from './includeStore';
import exportResources from './exportResources';

const init = (context) => pipe([
	includeRepos,
	includeStore,
	exportResources,
], context);

export default init;
