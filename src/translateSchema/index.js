import { convertSchema } from './types';

const translateSchema = ({ schema, ...rest }) => ({
	...rest,
	schema: convertSchema(schema).props,
});

export default translateSchema;
