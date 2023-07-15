import { mapAsync } from '../helpers';

const syncModels = async ({ models }) => {
	await mapAsync(models, (model) => model.sync({ alter: true }));
};

export default syncModels;
