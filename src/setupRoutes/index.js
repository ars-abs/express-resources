import { reduce } from '@laufire/utils/collection';
import { create, list, read, remove, update } from './controllers';
import enrichReq from './enrichReq';
const setupRoutes = (context) => {
	const { config: { resources }} = context;

	return {
		routes: reduce(
			resources, (acc, resource) => {
				const { name } = resource;

				const enrichedReq = enrichReq({ ...context, resource });

				return {
					...acc,
					[`GET /${ name }`]: [enrichedReq, list],
					[`GET /${ name }/:id`]: [enrichedReq, read],
					[`POST /${ name }`]: [enrichedReq, create],
					[`PUT /${ name }/:id`]: [enrichedReq, update],
					[`DELETE /${ name }/:id`]: [enrichedReq, remove],
				};
			}, {}
		),
	};
};

export default setupRoutes;
