export function validateUrl(url: string | undefined) {
  if (typeof url !== 'string') {
    return false;
  }
  url = url.replace('%1', 'QUERY_PARAM_1');
  url = url.replace('%2', 'QUERY_PARAM_2');
  try {
    const parsedUrl = new URL(url);
    if (disallowedOrigins.has(parsedUrl.origin)) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
}

const disallowedOrigins = new Set([
  'https://go.goudie.dev',
  'https://preview.go.goudie.dev',
  'http://go.goudie.dev',
  'http://preview.go.goudie.dev',
]);
