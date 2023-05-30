import operations from './operations';
import sequelize from '../sequelize';

const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};

const genResourceEndpoint = async (context) => {
	const { app,	data: { name, ...rest }} = context;
	const repo = await sequelize({ ...context, data: { name, ...rest }});

	app.use(includeContextToReq({ ...context, repo }));

	app.get(`/${ name }`, operations.getAll);
	app.post(`/${ name }`, operations.create);
	app.get(`/${ name }/:id`, operations.get);
	app.put(`/${ name }/:id`, operations.update);
	app.delete(`/${ name }/:id`, operations.remove);
};

export default genResourceEndpoint;
