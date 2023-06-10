import operations from './operations';
import sequelize from '../sequelize';
import validate from '../validate';
import respond from '../responses/respond';

const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};
const genValidator = (schema) => (
	req, res, next
) => (validate(schema, req.body)
	? next()
	: respond({ res: res, statusCode: 400, error: 'Invalid format' })
);

const genResourceEndpoint = async (context) => {
	const { app,	data: { name, schema }} = context;
	const repo = await sequelize(context);

	app.use(includeContextToReq({ ...context, repo }));
	const validatorMW = genValidator(schema);

	/* eslint-disable function-paren-newline */
	app.get(`/${ name }`, operations.getAll);
	app.post(`/${ name }`, validatorMW, operations.create);
	app.get(`/${ name }/:id`, operations.get);
	app.put(`/${ name }/:id`, validatorMW, operations.update);
	app.delete(`/${ name }/:id`, operations.remove);
	/* eslint-enable function-paren-newline */
};

export default genResourceEndpoint;
