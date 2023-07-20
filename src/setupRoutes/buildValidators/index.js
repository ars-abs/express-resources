import { map } from '@laufire/utils/collection';
import genValidateMiddleware from './genValidateMiddleware';
import genValidator from './genValidator';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, (resource) => {
		const { schema, pagination: { querySchema }} = resource;

		return {
			middleware: genValidateMiddleware(resource),
			body: genValidator(schema),
			query: genValidator(querySchema),
		};
	}),
});

export default buildValidators;
