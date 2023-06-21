import { mapAsync } from './helpers';

const syncEntities = async ({ entities }) => ({
	sync: await mapAsync(entities, (entity) => entity.sync({ alter: true })),
});

export default syncEntities;
