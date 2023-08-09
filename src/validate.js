import { isDefined } from '@laufire/utils/reflection';
import { find } from '@laufire/utils/collection';

const validateID = ({ data: { id }}) => isDefined(id);

const validateQuery = ({ name, meta, validators }) => {
	const { query: validate } = validators[name];

	return validate(meta);
};

const validateSchema = ({ name, data: { payload }, validators }) => {
	const { schema: validate } = validators[name];

	return validate(payload);
};

const actionValidators = {
	read: [validateID],
	list: [validateQuery],
	create: [validateSchema],
	update: [validateID, validateSchema],
	remove: [validateID],
};

const isValid = (validators, context) =>
	!find(validators, (validator) => !validator(context));

const validate = (context) => {
	const { action } = context;

	return Boolean(isValid(actionValidators[action], context));
};

export default validate;
