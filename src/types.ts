export interface IResp {
  mods: string[]
  enmods: string[]
  java_modified: number
  bedrock_modified: number
  java_modules: {
    resource: IResource[]
    collection: ICollection[]
  }
  bedrock_modules: {
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
  isBedrock?: boolean
  root?: string
}

export interface IReq {
  _bedrock: boolean
  format?: number
  modules: {
    resource: string[]
    collection: string[]
  }
  mod?: ['all'] | string[]
  type: 'normal' | 'legacy' | 'compat' | 'zip' | 'mcpack'
  compatible?: boolean
}

export interface IAlert {
  name: string
  message: string
}

export interface INews {
  id: number
  title: string
  image?: string
  video?: string
  content: string
  detail?: string
}

export type Theme = 'light' | 'dark'

export type Edition = 'java' | 'bedrock'
