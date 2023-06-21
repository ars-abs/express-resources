import operations from './operations';
import enrichReq from './enrichReq';

const genResourceEndpoint = (context) => {
	const { app, repoCRUD, validators, data: { name }} = context;
	const repo = repoCRUD[name];
	const validate = validators[name];

	app.use(enrichReq({ ...context, repo }));

	/* eslint-disable function-paren-newline */
	app.get(`/${ name }`, operations.getAll);
	app.post(`/${ name }`, validate, operations.create);
	app.get(`/${ name }/:id`, operations.get);
	app.put(`/${ name }/:id`, validate, operations.update);
	app.delete(`/${ name }/:id`, operations.remove);
	/* eslint-enable function-paren-newline */
};

export default genResourceEndpoint;
