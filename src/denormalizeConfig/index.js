import denormalizeResources from './denormalizeResources';

const denormalizeConfig = (context) => ({ config: {
	resources: denormalizeResources(context),
}});

export default denormalizeConfig;
