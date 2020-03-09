type ENV_VAR = string | number;

const getenv = (name: string, required: boolean, defaultValue?: ENV_VAR): ENV_VAR => {
  const value = process.env[name];

  if (value === undefined && required)
    throw new Error(`could not find required env var ${name}`);
  else if (value === undefined && !required)
    return defaultValue;

  return value;
}

export default getenv;