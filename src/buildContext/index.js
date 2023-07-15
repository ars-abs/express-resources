import normalizeConfig from './normalizeConfig';

const buildContext = (context) => ({
	...context, config: normalizeConfig(context),
});

export default buildContext;
