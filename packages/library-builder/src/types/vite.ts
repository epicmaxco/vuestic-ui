import { UserConfig } from 'vite';

type Strict<T extends Record<string, any> | undefined | false> = T extends false | null | undefined ? never : {
  [K in keyof T]-?: NonNullable<T[K]>
}

export type LibraryFormat = Strict<Strict<UserConfig>['build']['lib']>['formats'][number]