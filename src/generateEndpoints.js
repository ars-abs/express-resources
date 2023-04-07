const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};

const generateEndpoints = ({ app, config, ...rest }) => {
	app.use(includeContextToReq({ ...rest, config }));
};

export default generateEndpoints;
