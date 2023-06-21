import operations from './operations';
import genValidator from '../genValidator';
import enrichReq from './enrichReq';

const genResourceEndpoint = (context) => {
	const { app, repoCRUD,	data: { name, orgSchema }} = context;
	const repo = repoCRUD[name];

	app.use(enrichReq({ ...context, repo }));
	const validate = genValidator(orgSchema);

	/* eslint-disable function-paren-newline */
	app.get(`/${ name }`, operations.getAll);
	app.post(`/${ name }`, validate, operations.create);
	app.get(`/${ name }/:id`, operations.get);
	app.put(`/${ name }/:id`, validate, operations.update);
	app.delete(`/${ name }/:id`, operations.remove);
	/* eslint-enable function-paren-newline */
};

export default genResourceEndpoint;
