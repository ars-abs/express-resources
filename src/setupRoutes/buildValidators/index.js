import { map } from '@laufire/utils/collection';
import genValidator from './genValidator';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, ({ schema }) => genValidator(schema)),
});

export default buildValidators;
