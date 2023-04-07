const config = {
	repos: {
		postgres: {
			dataBase: 'SampleDB',
			host: 'localhost',
			password: 'root',
			type: 'postgres',
			userName: 'root',
		},
		sqlite: {
			path: './db.sqlite',
			type: 'sqlite',
		},
	},
	resources: {
		journals: {
			name: 'journals',
			repo: 'postgres',
			schema: {
				amount: 'number',
				credit: 'string',
				date: 'date',
				debit: 'string',
				document: 'string',
				notes: 'string',
			},
		},
		ledgers: {
			name: 'ledgers',
			repo: 'postgres',
			schema: {
				accountType: 'string',
				balance: 'number',
				ledger: 'string',
				notes: 'string',
				type: 'string',
			},
		},
	},
	schemaExtensions: {
		createdBy: { isRequired: true, type: 'string' },
		deleteAt: 'date',
	},
};

export default config;
