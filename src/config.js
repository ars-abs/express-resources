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
				properties: {
					amount: { title: 'Amount', type: 'number' },
					country: {
						enum: ['India', 'Africa', 'US'],
						type: 'string',
					},
					credit: { title: 'Credit', type: 'string' },
					date: { format: 'date', title: 'Date', type: 'string' },
					debit: { title: 'Debit', type: 'string' },
					document: { title: 'Document', type: 'string' },
					notes: { title: 'Notes', type: 'string' },
				},
			},
		},
		ledgers: {
			name: 'ledgers',
			repo: 'postgres',
			schema: {
				properties: {
					accountType: { title: 'AccountType', type: 'string' },
					balances: { title: 'Balances', type: 'number' },
					dateTime: {
						format: 'date-time',
						title: 'DateTime',
						type: 'string',
					},
					isActive: { title: 'IsActive', type: 'boolean' },
					ledger: { title: 'Ledger', type: 'string' },
					notes: { title: 'Notes', type: 'string' },
					time: { format: 'time', title: 'Time', type: 'string' },
					type: { title: 'Type', type: 'string' },
				},
			},
		},
	},
	schemaExtensions: {
		createdBy: { title: 'createdBy', type: 'string' },
		deleteAt: {
			format: 'date-time',
			title: 'deleteAt',
			type: 'string',
		},
	},
};

export default config;
