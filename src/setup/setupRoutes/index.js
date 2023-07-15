import { pipe } from '../../helpers';
import buildCRUD from './buildCRUD';
import buildValidators from './buildValidators';
import genResourceEndpoint from './resources/genResourceEndpoint';

const setupRoutes = (context) => pipe([
	buildCRUD,
	buildValidators,
	genResourceEndpoint,
], context);

export default setupRoutes;
