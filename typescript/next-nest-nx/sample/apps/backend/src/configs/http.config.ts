
const defaultConfig = {
  corsWhiteList: ['*'],
  reqTimeoutSeconds: 15,
};

const configs = {
  test: {},
  local: {
    ...defaultConfig,
  },
  prod: {
    ...defaultConfig,
  },
};

export default configs[process.env.STAGE || 'local'];
