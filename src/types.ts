export interface IResp {
  mods: string[]
  enmods: string[]
  je_modified: number
  be_modified: number
  je_modules: {
    resource: IResource[]
    collection: ICollection[]
  }
  be_modules: {
    resource: IResource[]
    collection: ICollection[]
  }
}

export interface IResource {
  name: string
  description: string
  author: string[]
  classifier: string[]
  dirname: string
  incompatible_with?: string[]
}

export interface ICollection extends IResource {
  contains: string[]
}

export interface ILog {
  title: string
  ts: number
  content: string
  filename?: string
  github?: string
  isBe?: boolean
  root?: string
}

export interface IReq {
  _be: boolean
  format?: number
  modules: {
    resource: string[]
    collection: string[]
  }
  mod?: ['all'] | string[]
  type: 'normal' | 'legacy' | 'compat' | 'zip' | 'mcpack'
  compatible?: boolean
}
