import generateEndpoints from './generateEndpoints';
import normalizeConfig from './normalizeConfig';

const expressSequelize = ({ app, config }) => {
	const normalizedConfig = normalizeConfig({ config });

	generateEndpoints({ app: app, config: normalizedConfig });
};

export default expressSequelize;
