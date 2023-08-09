const { map, merge } = require('@laufire/utils/collection');

const extendSchema = ({ config: { resources, schemaExtensions }}) => ({
	config: {
		resources: map(resources, (resource) =>
			merge({ schema: { properties: schemaExtensions }}, resource)),
	},
});

export default extendSchema;
