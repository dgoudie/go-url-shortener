export function validateName(name: string | undefined) {
  if (typeof name !== 'string') {
    return false;
  }
  if (!name.match(/^[\w\-_]+$/)) {
    return false;
  }
  if (disallowedNames.has(name)) {
    return false;
  }
  return true;
}

const disallowedNames = new Set(['console', 'api', 'setup', 'auth']);
