import actions from './actions';

const buildServices = (context) => ({
	service: ({ action, data, repo }) => actions[action]({
		...context, data, repo,
	}),
});

export default buildServices;
