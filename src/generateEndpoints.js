import { map } from '@laufire/utils/collection';
import { peek } from '@laufire/utils/debug';

const generateEndpoints = ({ config: { resources }}) => {
	map(resources, (resource) => peek(resource));
};

export default generateEndpoints;
