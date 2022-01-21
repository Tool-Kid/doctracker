import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { writeFileSync } from 'fs';
import { DocTrackerConfig } from '../../packages/tracker/src/lib/config/doctracker-config';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

interface JSONSchema {
  $schema: string;
  cli: string;
  $id: string;
  title: string;
  properties: any;
  definitions: any;
}

function generateJSONSchema() {
  new DocTrackerConfig();

  const JSONSchema = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
  });

  const properties = { ...JSONSchema.DocTrackerConfig.properties };
  delete JSONSchema.DocTrackerConfig;
  const definitions = { ...JSONSchema };

  const target: JSONSchema = {
    $schema: 'http://json-schema.org/schema',
    cli: 'doctracker',
    $id: 'DocTracker',
    title: 'DocTracker configuration schema',
    properties,
    definitions,
  };
  writeFileSync('schema.json', JSON.stringify(target, null, 2));
}

generateJSONSchema();
