import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import respond from './responses/respond';

const ajv = new Ajv();

addFormats(ajv);
const genValidator = (schema) => (
	req, res, next
) => (ajv.validate(schema, req.body)
	? next()
	: respond({ res: res, statusCode: 400, error: 'Invalid format' }));

export default genValidator;
