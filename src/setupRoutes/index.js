import { list, read, create, update, remove } from './controllers';
import enrichReq from './enrichReq';
import { map } from '@laufire/utils/collection';

const setupRoutes = (context) => {
	const { app, config: { resources }} = context;

	map(resources, (resource) => {
		const { name } = resource;

		app.use(enrichReq({ ...context, resource }));
		app.get(`/${ name }`, list);
		app.post(`/${ name }`, create);
		app.get(`/${ name }/:id`, read);
		app.put(`/${ name }/:id`, update);
		app.delete(`/${ name }/:id`, remove);
	});
};

export default setupRoutes;
