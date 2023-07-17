import normalizeConfig from './normalizeConfig';

const enrichContext = (context) => ({
	...context, config: normalizeConfig(context),
});

export default enrichContext;
