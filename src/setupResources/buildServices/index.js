import actions from './actions';

const buildServices = (context) => ({
	service: ({ action, ...props }) =>
		actions[action]({ ...context, ...props }),
});

export default buildServices;
