import { ComputedRef, InjectionKey } from 'vue'

export type VaFileUpload = {
  undoDuration: ComputedRef<number>
  undoButtonText: ComputedRef<string>
  deletedFileMessage: ComputedRef<string>
}

export const VaFileUploadKey = Symbol('VaFileUpload') as InjectionKey<VaFileUpload>

export interface VaFile extends Partial<File> {
  url?: string
}

export type ConvertedFile = {
  name: string,
  size?: string,
  date: string,
  image?: VaFile,
}
