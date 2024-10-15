import { ComponentPublicInstance, MaybeRef, Ref, computed, isRef, ref, unref, watch } from 'vue'
import { Mask, MaskToken } from './mask'
import { Cursor, CursorPosition } from './cursor'
import { unwrapEl } from '../../utils/unwrapEl'

const extractInput = (el: HTMLElement | null | undefined | ComponentPublicInstance) => {
  const htmlEl = unwrapEl(el)

  if (!htmlEl) {
    return null
  }

  if (htmlEl.tagName === 'INPUT') {
    return htmlEl as HTMLInputElement
  }

  return htmlEl.querySelector('input')
}

export const useInputMask = <Token extends MaskToken>(mask: MaybeRef<Mask<Token>>, el: Ref<HTMLInputElement | undefined | null | ComponentPublicInstance>) => {
  const inputText = ref('')

  const formatted = ref({
    text: '',
    tokens: [],
    data: undefined,
  }) as Ref<{
    text: string,
    tokens: Token[],
    data?: any
  }>

  const input = computed(() => extractInput(el.value))

  const setInputValue = (value: string, options?: InputEventInit) => {
    if (input.value!.value === value) {
      return
    }
    input.value!.value = value
    input.value!.dispatchEvent(new InputEvent('input', options))
  }

  const onBeforeInput = (e: InputEvent) => {
    const { inputType } = e
    const eventTarget = e.target as HTMLInputElement

    const data = e.data === null ? '' : e.data

    const currentValue = eventTarget.value

    const selectionStart = eventTarget.selectionStart ?? 0
    const selectionEnd = eventTarget.selectionEnd ?? 0

    const cursorStart = new Cursor<Token>(selectionStart, formatted.value!.tokens)
    const cursorEnd = new Cursor<Token>(selectionEnd, formatted.value!.tokens)

    // All input types: https://w3c.github.io/input-events/#interface-InputEvent-Attributes

    if (inputType === 'deleteContentBackward') {
      e.preventDefault()
      if (+cursorStart === +cursorEnd) {
        // From 1[]2 to [1]2
        cursorStart.moveBack(1, CursorPosition.AfterChar)
      }
    } else if (inputType === 'deleteContentForward' || inputType === 'deleteContent' || inputType === 'deleteByCut') {
      e.preventDefault()
      if (+cursorStart === +cursorEnd) {
        // From 1[]23 to 1[2]3
        cursorEnd.moveForward(1, CursorPosition.AfterChar)
      }
    } else if (inputType === 'insertText' || inputType === 'insertFromPaste') {
      e.preventDefault()
    }

    const tokens = formatted.value.tokens
    inputText.value = currentValue.slice(0, +cursorStart) + data + currentValue.slice(+cursorEnd)
    formatted.value = unref(mask).format(inputText.value)

    // If pasted, move cursor to the end of how much was pasted counting formatted value and static tokens
    if (inputType === 'insertFromPaste') {
      cursorStart.position += formatted.value.text.length - currentValue.length
    }

    unref(mask).handleCursor(cursorStart, cursorEnd, tokens, formatted.value.tokens, data, formatted.value.data)

    setInputValue(formatted.value!.text, e)

    eventTarget.setSelectionRange(+cursorStart, +cursorEnd)
  }

  const onKeydown = (e: KeyboardEvent) => {
    const el = e.target as HTMLInputElement

    if (e.key === 'ArrowLeft') {
      if (el.selectionStart === el.selectionEnd) {
        const cursor = new Cursor((el.selectionStart ?? 0), formatted.value!.tokens)
        cursor.moveBack(1)
        el.setSelectionRange(+cursor, +cursor)
      } else {
        el.setSelectionRange(el.selectionStart, el.selectionStart)
      }

      e.preventDefault()
    }

    if (e.key === 'ArrowRight') {
      if (el.selectionStart === el.selectionEnd) {
        const cursor = new Cursor((el.selectionEnd ?? 0), formatted.value!.tokens)
        cursor.moveForward(1)
        el.setSelectionRange(+cursor, +cursor)
      } else {
        el.setSelectionRange(el.selectionEnd, el.selectionEnd)
      }
      e.preventDefault()
    }
  }

  watch(input, (newValue, oldValue) => {
    if (newValue) {
      formatted.value = unref(mask).format(newValue.value)
      const cursor = new Cursor((newValue.selectionEnd ?? 0), formatted.value!.tokens)
      cursor.moveForward(1)
      setInputValue(formatted.value.text)
      newValue.setSelectionRange(+cursor, +cursor)

      newValue.addEventListener('beforeinput', onBeforeInput)
      newValue.addEventListener('keydown', onKeydown)
    }
    if (oldValue) {
      oldValue.removeEventListener('beforeinput', onBeforeInput)
      oldValue.removeEventListener('keydown', onKeydown)
    }
  }, { immediate: true })

  const unmasked = computed(() => {
    return unref(mask).unformat(formatted.value.text, formatted.value.tokens)
  })

  return {
    inputText: formatted,
    masked: computed(() => formatted.value?.text ?? ''),
    unmasked,
  }
}
