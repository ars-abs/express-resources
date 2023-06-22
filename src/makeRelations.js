import { mapAsync } from './helpers';

const oneToOne = ({ entities, data: { entity, prop, name }}) => {
	const parent = entities[name];
	const child = entities[entity];

	parent.hasOne(child, { foreignKey: name, sourceKey: prop || 'id' });
	child.belongsTo(parent);
};
const manyToOne = ({ entities, data: { entity, prop, name }}) => {
	const child = entities[name];
	const parent = entities[entity];

	parent.hasMany(child, { foreignKey: name, sourceKey: prop || 'id' });
	child.belongsTo(parent, { foreignKey: name, targetKey: prop || 'id' });
};

const makeRelations = async (context) => {
	const { config: { resources }} = context;

	await mapAsync(resources, ({ name, orgSchema: { properties }}) => {
		// eslint-disable-next-line complexity
		mapAsync(properties, ({ type, format, entity, prop, unique }) => {
			type === 'string' && format === 'ref' && unique
			&& oneToOne({ ...context, data: { entity, prop, name }});
			type === 'string' && format === 'ref' && unique === false
			&& manyToOne({ ...context, data: { entity, prop, name }});
		});
	});
};

export default makeRelations;
