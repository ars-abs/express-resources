import { mapAsync } from '../helpers';

const syncEntities = async ({ entities }) => {
	await mapAsync(entities, (entity) => entity.sync({ alter: true }));
};

export default syncEntities;
