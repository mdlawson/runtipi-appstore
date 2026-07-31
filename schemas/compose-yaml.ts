import { type } from 'arktype';

const xRuntipiService = type({
  is_main: 'boolean?',
  internal_port: 'number | string?',
  add_to_main_network: 'boolean?',
});

const serviceObject = type({
  image: 'string',
  networks: type({
    '[string]': 'unknown',
  })
    .or('string[]')
    .optional(),
  ports: type('unknown[]').optional(),
  labels: type({
    '[string]': 'string | number | boolean',
  })
    .or('string[]')
    .optional(),
  'x-runtipi': xRuntipiService.optional(),
  '[string]': 'unknown',
});

const services = type({
  '[string]': serviceObject,
});

export const dynamicComposeSchemaYaml = type({
  services,
  networks: type({
    '[string]': 'unknown',
  }).optional(),
  'x-runtipi': type({
    schema_version: '1 | 2',
    overrides: type({
      architecture: '"arm64" | "amd64"',
      services: type({
        '[string]': serviceObject.partial().and({ image: 'string' }),
      }),
    })
      .array()
      .optional(),
  }),
  '[string]': 'unknown',
});