const oneToOne = ({ models, data: {
	source, sourceProp, target, targetProp,
}}) => {
	const peerOne = models[target];
	const peerTwo = models[source];

	peerOne.hasOne(peerTwo, {
		foreignKey: sourceProp, sourceKey: targetProp || 'id',
	});
	peerTwo.belongsTo(peerOne);
};
const manyToOne = ({ models, data: {
	source, sourceProp, target, targetProp,
}}) => {
	const child = models[source];
	const parent = models[target];

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
