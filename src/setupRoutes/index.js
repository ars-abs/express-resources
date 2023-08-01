import { pipe } from '../helpers';
import buildCRUDEndpoints from './buildCRUDEndpoints';

const setupRoutes = (context) => pipe([
	buildCRUDEndpoints,
], context);

export default setupRoutes;
