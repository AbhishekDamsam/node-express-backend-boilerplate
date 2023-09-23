import { getDbClient } from './getDbClient';

const client = getDbClient();

async function createSchema() {
  try {
    await client.connect();

    // Define your schema creation queries here
    const schemaQueries = [
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
      ,
      `
      CREATE TABLE IF NOT EXISTS ASSET (
        ASSET_ID UUID DEFAULT uuid_generate_v4 (),
        NAME VARCHAR ( 50 ) NOT NULL,
          DESCRIPTION VARCHAR ( 100 ),
          FILE_TYPE INTEGER NOT NULL,
        CREATED_ON TIMESTAMP NOT NULL,
          ISACTIVE BOOLEAN NOT NULL,
          PRIMARY KEY (ASSET_ID)
      )`,
    ];

    for (const query of schemaQueries) {
      await client.query(query);
      console.log('Executed query:', query) // eslint-disable-line no-console
    }

    console.log('Schema creation completed successfully!') // eslint-disable-line no-console
  } catch (error) {
    console.error('Error creating schema:', error) // eslint-disable-line no-console
  } finally {
    await client.end()
  }
}

createSchema()
