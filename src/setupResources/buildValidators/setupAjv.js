import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import errors from 'ajv-errors';

const ajv = new Ajv({ coerceTypes: true, allErrors: true });

errors(ajv);

ajv.addFormat('ref', {
	validate: (data) => typeof data === 'string'
    && (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i).test(data),
});
ajv.addKeyword({ keyword: 'entity' });
ajv.addKeyword({ keyword: 'prop' });
ajv.addKeyword({ keyword: 'unique' });
addFormats(ajv);

export default ajv;
