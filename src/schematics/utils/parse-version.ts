export function parseVersion(version: string): [string, string, string] {
  const [major, minor, patch] = (version.replace(/(\^|\~)/, '')).split('.', 3);
  return [major, minor, patch];
}
