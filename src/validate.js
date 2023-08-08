import { isDefined } from '@laufire/utils/reflection';
import ajv from './setupResources/buildValidators/setupAjv';
import { find } from '@laufire/utils/collection';

const validateID = ({ data: { id }}) => isDefined(id);

const validateQuery = ({ name, meta, config: { resources }}) => {
	const { pagination: { querySchema: schema }} = resources[name];

	return ajv.validate(schema, meta);
};

const validateSchema = ({ name, data: { payload }, config: { resources }}) => {
	const { schema } = resources[name];

	return ajv.validate(schema, payload);
};

const validators = {
	read: [validateID],
	list: [validateQuery],
	create: [validateSchema],
	update: [validateID, validateSchema],
	remove: [validateID],
};

const pipe = (pipes, context) =>
	!find(pipes, (validator) => !validator(context));

const validate = (context) => {
	const { action } = context;

	return Boolean(pipe(validators[action], context));
};

export default validate;
