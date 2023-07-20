import respond from '../../helpers/responses/respond';
import ajv from './setupAjv';

const genValidateMiddleware = (schema) => (
	req, res, next
) => (ajv.validate(schema, req.body)
	? next()
	: respond({ res: res, statusCode: 400, error: 'Invalid format' }));

export default genValidateMiddleware;
