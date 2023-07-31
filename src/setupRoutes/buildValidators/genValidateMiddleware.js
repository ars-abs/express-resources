import { getValidQuery } from '../../helpers';
import respond from '../../helpers/responses/respond';
import ajv from './setupAjv';

const genValidateMiddleware = ({ schema, pagination: { querySchema }}) => (
	{ body, query }, res, next
) => {
	const validQuery = getValidQuery(query);

	return ajv.validate(schema, body) && ajv.validate(querySchema, validQuery)
		? next()
		: respond({ res: res, statusCode: 400, error: 'Invalid format' });
};

export default genValidateMiddleware;
