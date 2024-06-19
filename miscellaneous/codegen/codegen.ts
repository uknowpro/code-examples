import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '.introspection.json',
  generates: {
    'generated/code.ts': {
      config: {
        withHooks: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: true,
        },
      },
      plugins: [
        'typescript',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
