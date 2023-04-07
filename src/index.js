import generateEndpoints from './generateEndpoints';
import normalizeConfig from './normalizeConfig';

const expressSequelize = (context) =>
	generateEndpoints({ ...context, config: normalizeConfig(context) });

export default expressSequelize;
