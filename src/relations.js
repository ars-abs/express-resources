const oneToOne = ({ entities, data: { entity, prop, name, propName }}) => {
	const parent = entities[name];
	const child = entities[entity];

	parent.hasOne(child, { foreignKey: propName, sourceKey: prop || 'id' });
	child.belongsTo(parent);
};
const manyToOne = ({ entities, data: { entity, prop, name, propName }}) => {
	const child = entities[name];
	const parent = entities[entity];

	parent.hasMany(child, { foreignKey: propName, sourceKey: prop || 'id' });
	child.belongsTo(parent, { foreignKey: propName, targetKey: prop || 'id' });
};
const relations = {
	oneToOne, manyToOne,
};

export default relations;
