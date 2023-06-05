import operations from './operations';
import sequelize from '../sequelize';
import validate from '../validate';

const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};

const genResourceEndpoint = async (context) => {
	const { app,	data: { name, orgSchema, ...rest }} = context;
	const repo = await sequelize({
		...context, data: { name, ...rest },
	});
	const badRequest = 400;

	app.use(includeContextToReq({ ...context, repo }));
	/* eslint-disable function-paren-newline */
	const validatorMW = (req, res, next) => (validate(orgSchema, req.body)
		? next()
		: res.status(badRequest).json({ error: 'invalid format' }));

	app.get(`/${ name }`, operations.getAll);
	app.post(`/${ name }`, validatorMW, operations.create);
	app.get(`/${ name }/:id`, operations.get);
	app.put(`/${ name }/:id`, validatorMW, operations.update);
	app.delete(`/${ name }/:id`, operations.remove);
	/* eslint-enable function-paren-newline */
};

export default genResourceEndpoint;
