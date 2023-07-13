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

	await mapAsync(resources, ({ name, orgSchema: { properties }}) =>
		mapAsync(properties, ({ entity, prop, ...rest }, propName) => {
			const relationType = findIndex(relationTypes, (fn) => fn(rest));

			relationType && relations[relationType]({
				...context,
				data: {
					source: name,
					sourceProp: propName,
					target: entity,
					targetProp: prop,
				},
			});
		}));
};

export default makeRelations;
