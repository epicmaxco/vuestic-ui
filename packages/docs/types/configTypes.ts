import { TranslationString } from '../utilities/ApiOptions'
import Vue from 'vue-property-decorator'

export enum BlockType {
  COMPONENT = 'COMPONENT',
  SUBTITLE = 'SUBTITLE',
  TITLE = 'TITLE',
}

export type Block =
  | {
      type: Exclude<BlockType, BlockType.COMPONENT>,
      translationString: TranslationString,
    }
  | {
      type: BlockType.COMPONENT,
      component: Vue,
    }
