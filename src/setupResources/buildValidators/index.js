import { map } from '@laufire/utils/collection';
import genValidator from './genValidator';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, (resource) => {
		const { schema, pagination: { querySchema }} = resource;

		return {
			body: genValidator(schema),
			query: genValidator(querySchema),
		};
	}),
});

export default buildValidators;
