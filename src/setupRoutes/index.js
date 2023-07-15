import { pipe } from '../helpers';
import buildValidators from './buildValidators';
import buildCRUDEndpoints from './buildCRUDEndpoints';

const setupRoutes = (context) => pipe([
	buildValidators,
	buildCRUDEndpoints,
], context);

export default setupRoutes;
