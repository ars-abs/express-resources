import { merge } from '@laufire/utils/collection';
import { mapAsync } from '../../helpers';
import services from './services';

const buildServices = async (context) => ({
	services: await mapAsync(context.models, (db, name) =>
		mapAsync(services, (service) => (props) => service(merge(
			context, props, { data: { db, name }}
		)))),
});

export default buildServices;
