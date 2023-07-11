import { mapAsync } from './helpers';
import { findIndex } from '@laufire/utils/collection';
import relations from './relations';

const relationTypes = {
	oneToOne: ({ type, format, unique }) =>
		type === 'string' && format === 'ref' && unique,
	manyToOne: ({ type, format }) => type === 'string' && format === 'ref',
};

const makeRelations = async (context) => {
	const { config: { resources }} = context;

	await mapAsync(resources, ({ name, orgSchema: { properties }}) => {
		mapAsync(properties, ({
			type, format, entity, prop, unique,
		}, propName) => {
			const relationType = findIndex(relationTypes,
				(fn) => fn({ type, format, unique }));

			relationType && relations[relationType]({
				...context, data: { entity, prop, name, propName },
			});
		});
	});
};

export default makeRelations;
