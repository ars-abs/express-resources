import operations from './operations';
import enrichReq from './enrichReq';
import { map } from '@laufire/utils/collection';

const buildCRUDEndpoints = (context) => {
	const { app, repoCRUD, validators, config: { resources }} = context;

	map(resources, ({ name }) => {
		const repo = repoCRUD[name];
		const validate = validators[name];

		app.use(enrichReq({ ...context, repo: repo, data: { name }}));
		/* eslint-disable function-paren-newline */
		app.get(`/${ name }`, operations.getAll);
		app.post(`/${ name }`, validate, operations.create);
		app.get(`/${ name }/:id`, operations.get);
		app.put(`/${ name }/:id`, validate, operations.update);
		app.delete(`/${ name }/:id`, operations.remove);
		/* eslint-enable function-paren-newline */
	});
};

export default buildCRUDEndpoints;
