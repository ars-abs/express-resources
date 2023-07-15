import { pipe } from '../helpers';
import buildCRUD from './buildCRUD';
import buildValidators from './buildValidators';
import buildCRUDEndpoints from './buildCRUDEndpoints';

const setupRoutes = (context) => pipe([
	buildCRUD,
	buildValidators,
	buildCRUDEndpoints,
], context);

export default setupRoutes;
