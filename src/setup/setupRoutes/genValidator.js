import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import respond from '../../responses/respond';

const ajv = new Ajv();

ajv.addFormat('ref', {
	validate: (data) => typeof data === 'string'
    && (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i).test(data),
});
ajv.addKeyword({ keyword: 'entity' });
ajv.addKeyword({ keyword: 'prop' });
ajv.addKeyword({ keyword: 'unique' });
addFormats(ajv);

const genValidator = (schema) => (
	req, res, next
) => (ajv.validate(schema, req.body)
	? next()
	: respond({ res: res, statusCode: 400, error: 'Invalid format' }));

export default genValidator;
