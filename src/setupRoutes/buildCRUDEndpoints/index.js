import { getAll, get, create, update, remove } from './operations';
import enrichReq from './enrichReq';
import { map } from '@laufire/utils/collection';

const buildCRUDEndpoints = (context) => {
	const { app, services, config: { resources }} = context;

	map(resources, ({ name }) => {
		const service = services[name];
		const data = { name };

		app.use(enrichReq({ ...context, service, data }));
		/* eslint-disable function-paren-newline */
		app.get(`/${ name }`, getAll);
		app.post(`/${ name }`, create);
		app.get(`/${ name }/:id`, get);
		app.put(`/${ name }/:id`, update);
		app.delete(`/${ name }/:id`, remove);
		/* eslint-enable function-paren-newline */
	});
};

export default buildCRUDEndpoints;
