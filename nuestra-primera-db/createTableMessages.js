import { optionsMariaDB } from './options/config.js';

require('knex') ({
    client: optionsMariaDB
})

knex.schema.createTable('messages', table => {
	table.increments('id')
	table.string('email')
	table.string('message')
	table.string('date')
})
	.then(() => console.log('Table created'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())