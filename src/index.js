import generateEndpoints from './generateEndpoints';
import normalizeConfig from './normalizeConfig';

const expressResources = (context) =>
	generateEndpoints({ ...context, config: normalizeConfig(context) });

export { expressResources };
