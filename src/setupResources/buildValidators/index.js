import { map } from '@laufire/utils/collection';
import ajv from './setupAjv';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, ({ schema, pagination: { querySchema }}) => ({
		query: ajv.compile(querySchema),
		schema: ajv.compile(schema),
	})),
});

export default buildValidators;
