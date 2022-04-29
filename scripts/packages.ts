export interface PackageManifest {
  name: string
  display: string
  addon?: boolean
  author?: string
  description?: string
  external?: string[]
  globals?: Record<string, string>
  manualImport?: boolean
  deprecated?: boolean
}

export const packages: PackageManifest[] = [
  {
    name: 'qysubpub-jssdk',
    display: 'qysubpub-jssdk',
    description: 'jssdk for qysubpub',
    external: [],
    globals: {}
  }
]

export const activePackages = packages.filter(i => !i.deprecated)
