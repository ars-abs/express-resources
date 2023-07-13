const oneToOne = ({ entities, data: {
	source, sourceProp, target, targetProp,
}}) => {
	const peerOne = entities[target];
	const peerTwo = entities[source];

	peerOne.hasOne(peerTwo, {
		foreignKey: sourceProp, sourceKey: targetProp || 'id',
	});
	peerTwo.belongsTo(peerOne);
};
const manyToOne = ({ entities, data: {
	source, sourceProp, target, targetProp,
}}) => {
	const child = entities[source];
	const parent = entities[target];

	parent.hasMany(child, {
		foreignKey: sourceProp, sourceKey: targetProp || 'id',
	});
	child.belongsTo(parent, {
		foreignKey: sourceProp, targetKey: targetProp || 'id',
	});
};
const relations = {
	oneToOne,
	manyToOne,
};

export default relations;
