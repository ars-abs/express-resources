import { map } from '@laufire/utils/collection';
import translateSchema from './translateSchema';

const generateEndpoints = () => {};

const normalizeConfig = ({ config: { resources, ...rest }}) => ({
	...rest,
	resources: map(resources, translateSchema),
});

const expressSequelize = ({ app, config }) => {
	const normalizedConfig = normalizeConfig({ config });

	generateEndpoints({ app: app, config: normalizedConfig });
};

export default expressSequelize;
