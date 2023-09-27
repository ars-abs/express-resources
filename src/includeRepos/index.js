import repoTypes from './repoTypes';

const includeRepos = ({ processRepos }) => ({
	repos: processRepos(repoTypes),
});

export default includeRepos;
