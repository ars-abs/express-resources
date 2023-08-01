import ajv from './setupAjv';

const genValidator = (schema) => (data) => ajv.validate(schema, data);

export default genValidator;
