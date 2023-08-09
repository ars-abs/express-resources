import enrichResources from './enrichResources';
import { pipe } from '../helpers';
import extendSchema from './extendSchema';
import denormalizeConfig from '../denormalizeConfig';

const enrichContext = (context) => pipe([
	extendSchema,
	denormalizeConfig,
	enrichResources,
], context);

export default enrichContext;
