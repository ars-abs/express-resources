import { getAll, get, create, update, remove } from './operations';
import enrichReq from './enrichReq';
import { map } from '@laufire/utils/collection';

const buildCRUDEndpoints = (context) => {
	const { app, repoCRUD, validators, config: { resources }} = context;

	map(resources, ({ name }) => {
		const repo = repoCRUD[name];
		const validate = validators[name].middleware;

		app.use(enrichReq({ ...context, repo: repo, data: { name }}));
		/* eslint-disable function-paren-newline */
		app.get(`/${ name }`, validate, getAll);
		app.post(`/${ name }`, validate, create);
		app.get(`/${ name }/:id`, get);
		app.put(`/${ name }/:id`, validate, update);
		app.delete(`/${ name }/:id`, remove);
		/* eslint-enable function-paren-newline */
	});
};

export default buildCRUDEndpoints;
