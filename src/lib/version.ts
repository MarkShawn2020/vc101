import packageJson from '../../package.json';

export function getVersion(): string {
  return packageJson.version;
}

export function getVersionedFilename(basename: string, extension: string): string {
  const version = getVersion();
  return `${basename}_v${version}.${extension}`;
}