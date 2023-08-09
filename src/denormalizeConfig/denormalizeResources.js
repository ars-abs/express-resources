import { map } from '@laufire/utils/collection';
import denormalizeResource from './denormalizeResource';

const denormalizeResources = ({ config: { resources }}) =>
	map(resources, (resource, key) =>
		denormalizeResource({ resource, key }));

export default denormalizeResources;
