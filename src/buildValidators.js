import { map } from '@laufire/utils/collection';
import genValidator from './genValidator';

const buildValidators = ({ config: { resources }}) => ({
	validators: map(resources, ({ orgSchema }) => genValidator(orgSchema)),
});

export default buildValidators;
