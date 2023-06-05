import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();

addFormats(ajv);
const validate = (schema, data) => ajv.validate(schema, data);

export default validate;
