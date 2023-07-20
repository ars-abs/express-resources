import { map } from '@laufire/utils/collection';
import genValidateMiddleware from './genValidateMiddleware';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, ({ schema }) => genValidateMiddleware(schema)),
});

export default buildValidators;
