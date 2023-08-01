import { mapAsync } from '../../helpers';
import actions from './actions';

const buildServices = async (context) => ({
	services: await mapAsync(context.models, (db, name) =>
		({ action, data }) => actions[action]({
			...context, data: data, repo: { db, name },
		})),
});

export default buildServices;
