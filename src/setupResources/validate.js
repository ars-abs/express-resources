import { isDefined } from '@laufire/utils/reflection';
import { reduce } from '@laufire/utils/collection';

const validateID = ({ data: { id }}) =>
	(isDefined(id) ? {} : { error: { code: 'idNotFound' }});

const validateQuery = ({ name, meta, validators }) => {
	const { query: validate } = validators[name];

	return validate(meta)
		? {}
		: { error: {
			data: validate.errors[0].params.errors,
			code: 'invalidRequest',
			message: validate.errors[0].message,
		}};
};

const validateSchema = ({ name, data: { payload }, validators }) => {
	const { schema: validate } = validators[name];

	return validate(payload)
		? {}
		: { error: {
			data: validate.errors[0].params.errors,
			code: 'invalidData',
			message: validate.errors[0].message,
		}};
};

const actionValidators = {
	read: [validateID],
	list: [validateQuery],
	create: [validateSchema],
	update: [validateID, validateSchema],
	remove: [validateID],
};

const isValid = (validators, context) => reduce(
	validators, (acc, validator) => (acc.error ? acc : validator(context)), {}
);

const validate = (context) => {
	const { action } = context;

	return isValid(actionValidators[action], context);
};

export default validate;
