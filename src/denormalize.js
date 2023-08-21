import { pipe } from './helpers';
import extendSchema from './parseContext/extendSchema';
import denormalizeConfig from './parseContext/denormalizeConfig';
import enrichResources from './parseContext/enrichResources';

const denormalize = (context) => pipe([
	extendSchema,
	denormalizeConfig,
	enrichResources,
], context);

export default denormalize;
