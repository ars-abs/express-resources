import enrichResources from './enrichResources';
import { pipe } from '../helpers';
import extendSchema from './extendSchema';
import denormalizeConfig from './denormalizeConfig';
import includeActions from './includeActions';

const parseContext = (context) => pipe([
	extendSchema,
	denormalizeConfig,
	enrichResources,
	includeActions,
], context);

export default parseContext;
