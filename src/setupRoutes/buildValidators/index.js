import { map } from '@laufire/utils/collection';
import genValidateMiddleware from './genValidateMiddleware';
import genValidator from './genValidator';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, ({ schema, pagination: { querySchema }}) => ({
		middleware: genValidateMiddleware(schema),
		body: genValidator(schema),
		query: genValidator(querySchema),
	})),
});

export default buildValidators;
