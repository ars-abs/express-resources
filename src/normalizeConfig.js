import { map } from '@laufire/utils/collection';
import repoStandards from './resources/repoStandards';
import { convertSchema } from './translateSchema/types';

const normalizeConfig = ({ config }) => {
	const { resources, repos } = config;

	return {
		...config,
		resources: map(resources, ({ repo, schema, ...rest }) => ({
			...rest,
			repo: repoStandards[typeof repo]({ repo, repos }),
			schema: convertSchema(schema),
		})),
	} ;
};

export default normalizeConfig;
