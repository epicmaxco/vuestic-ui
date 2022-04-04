export interface VaFile extends Partial<File> {
  url?: string
}

export type ConvertedFile = {
  name: string,
  size?: string,
  date: string,
  image?: VaFile,
}
