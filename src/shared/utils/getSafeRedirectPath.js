export function getSafeRedirectPath(value) {
  return typeof value === 'string' && value.startsWith('/') ? value : null
}
