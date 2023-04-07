import { peek } from '@laufire/utils/debug';

/* Tasks */
const generateEndpoints = () => {};
const normalizeConfig = () => {};

const expressSequelize = ({ app, config }) => {
	peek(app);
	const normalizedConfig = normalizeConfig(config);

	generateEndpoints({ app: app, config: normalizedConfig });
};

export default expressSequelize;
