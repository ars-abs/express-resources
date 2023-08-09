import { merge } from '@laufire/utils/collection';
import denormalizeResources from './denormalizeResources';

const denormalizeConfig = (context) => merge({ config: {
	resources: denormalizeResources(context),
}}, context);

export default denormalizeConfig;
