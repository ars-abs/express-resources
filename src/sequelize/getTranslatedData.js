import { omit } from '@laufire/utils/collection';

const getTranslatedData = (doc) => {
	const data = doc ? doc.dataValues : {};
	// eslint-disable-next-line no-underscore-dangle
	const result = { ...data, id: data._id };

	return omit(result, ['_id']);
};

export default getTranslatedData;
