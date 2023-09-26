import { map } from '@laufire/utils/collection';
import repoTypes from './repoTypes';

const includeRepos = ({ config: { repos }}) => ({
	repos: map(repos, ({ type, ...props }) => repoTypes[type](props)),
});

export default includeRepos;
