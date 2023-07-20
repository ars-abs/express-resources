import respond from '../../helpers/responses/respond';
import ajv from './setupAjv';
const getValidQuery = (query) => (query.offset && query.limit
	? {
		...query,
		offset: Number(query.offset),
		limit: Number(query.limit),
	}
	: query);

const genValidateMiddleware = ({ schema, pagination: { querySchema }}) => (
	{ body, query }, res, next
) => {
	const validQuery = getValidQuery(query);

	return ajv.validate(schema, body) && ajv.validate(querySchema, validQuery)
		? next()
		: respond({ res: res, statusCode: 400, error: 'Invalid format' });
};

export default genValidateMiddleware;
