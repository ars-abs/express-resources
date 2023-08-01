import { getAll, get, create, update, remove } from './controllers';
import enrichReq from './enrichReq';
import { map } from '@laufire/utils/collection';

const buildCRUDEndpoints = (context) => {
	const { app, services, config: { resources }} = context;

	map(resources, ({ name }) => {
		const service = services[name];
		const data = { name };

		app.use(enrichReq({ ...context, service, data }));
		app.get(`/${ name }`, getAll);
		app.post(`/${ name }`, create);
		app.get(`/${ name }/:id`, get);
		app.put(`/${ name }/:id`, update);
		app.delete(`/${ name }/:id`, remove);
	});
};

export default buildCRUDEndpoints;
