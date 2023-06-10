import operations from './operations';
import sequelize from '../sequelize';
import genValidator from '../genValidator';
const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};

const genResourceEndpoint = async (context) => {
	const { app,	data: { name, orgSchema }} = context;
	const repo = await sequelize(context);

	app.use(includeContextToReq({ ...context, repo }));
	const validatorMW = genValidator(orgSchema);

	/* eslint-disable function-paren-newline */
	app.get(`/${ name }`, operations.getAll);
	app.post(`/${ name }`, validatorMW, operations.create);
	app.get(`/${ name }/:id`, operations.get);
	app.put(`/${ name }/:id`, validatorMW, operations.update);
	app.delete(`/${ name }/:id`, operations.remove);
	/* eslint-enable function-paren-newline */
};

export default genResourceEndpoint;
