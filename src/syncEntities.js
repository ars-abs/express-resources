import { mapAsync } from './helpers';

const syncEntities = ({ entities }) =>
	mapAsync(entities, (entity) => entity.sync({ alter: true }));

export default syncEntities;
