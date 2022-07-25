import { Ref, InjectionKey } from 'vue'

export type VaFileUpload = {
  undoDuration: Ref<number>
  undoButtonText: Ref<string>
  deletedFileMessage: Ref<string>
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
