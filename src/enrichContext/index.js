import { merge } from '@laufire/utils/collection';
import enrichResources from './enrichResources';

const enrichContext = (context) => merge(
	{}, context, enrichResources(context),
);

export default enrichContext;
