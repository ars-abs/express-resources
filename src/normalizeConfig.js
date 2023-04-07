import { map } from '@laufire/utils/collection';
import translateSchema from './translateSchema';

const normalizeConfig = ({ config: { resources, ...rest }}) => ({
	...rest,
	resources: map(resources, translateSchema),
});

export default normalizeConfig;
