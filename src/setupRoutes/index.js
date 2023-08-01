import { getAll, get, create, update, remove } from './controllers';
import enrichReq from './enrichReq';
import { map } from '@laufire/utils/collection';

const setupRoutes = (context) => {
	const { app, models, config: { resources }} = context;

	map(resources, ({ name }) => {
		const db = models[name];
		const repo = { name, db };

		app.use(enrichReq({ ...context, repo }));
		app.get(`/${ name }`, getAll);
		app.post(`/${ name }`, create);
		app.get(`/${ name }/:id`, get);
		app.put(`/${ name }/:id`, update);
		app.delete(`/${ name }/:id`, remove);
	});
};

export default setupRoutes;
