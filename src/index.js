import generateEndpoints from './base/generateEndpoints';
import normalizeConfig from './base/normalizeConfig';

const expressSequelize = (context) =>
	generateEndpoints({ ...context, config: normalizeConfig(context) });

export default expressSequelize;
