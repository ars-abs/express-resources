import { isDefined } from '@laufire/utils/reflection';
import ajv from './setupResources/buildValidators/setupAjv';

const validators = {
	read: ({ data: { id }}) => isDefined(id),
	list: ({ name, meta, config: { resources }}) => {
		const { pagination: { querySchema }} = resources[name];

		return ajv.validate(querySchema, meta);
	},
	create: ({ name, data: { payload }, config: { resources }}) => {
		const { schema } = resources[name];

		return ajv.validate(schema, payload);
	},
	update: ({ name, data: { id, payload }, config: { resources }}) => {
		const { schema } = resources[name];

		return isDefined(id) && ajv.validate(schema, payload);
	},
	remove: ({ data: { id }}) => isDefined(id),
};

export default validators;
