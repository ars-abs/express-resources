import generateEndpoints from './base/generateEndpoints';
import normalizeConfig from './base/normalizeConfig';

const expressResources = (context) =>
	generateEndpoints({ ...context, config: normalizeConfig(context) });

export { expressResources };
