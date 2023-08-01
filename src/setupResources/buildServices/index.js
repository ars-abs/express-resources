import { mapAsync } from '../../helpers';
import services from './services';

const buildServices = async (context) => ({
	services: await mapAsync(context.models, (db, name) =>
		({ action, data }) => services[action]({
			...context, data: data, repo: { db, name },
		})),
});

export default buildServices;
