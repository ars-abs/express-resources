import { reduce } from '@laufire/utils/collection';
import { create, list, read, remove, update } from './controllers';
import genEnrichReq from './enrichReq';

const setupRoutes = (context) => {
	const { config: { resources }} = context;

	return {
		routes: reduce(
			resources, (acc, resource) => {
				const { name } = resource;
				const enrichReq = genEnrichReq({ ...context, resource });

				return {
					...acc,
					[`GET /${ name }`]: [enrichReq, list],
					[`GET /${ name }/:id`]: [enrichReq, read],
					[`POST /${ name }`]: [enrichReq, create],
					[`PUT /${ name }/:id`]: [enrichReq, update],
					[`DELETE /${ name }/:id`]: [enrichReq, remove],
				};
			}, {}
		),
	};
};

export default setupRoutes;
