import {ref} from 'vue';
import { isServer } from 'vuestic-ui/src/utils/ssr'

let addedScript = false;

interface Recaptcha {
  render(
    container: string | HTMLElement,
    parameters: {
      sitekey: string;
      theme?:	'dark' | 'light';
      size?:	'compact' | 'normal';
      tabindex?: number;
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    }
  ): string;
  reset(widgetId?: string): void;
}

const recaptcha = ref<Recaptcha>();

const onloadCallbackId = 'recaptchaLoadCallback'

const onloadCallback = () => {
  recaptcha.value = (window as any).grecaptcha
  delete window[onloadCallbackId]
}

export const useRecaptcha = () => {
  if (!isServer() && !addedScript) {
    Object.assign(window, {[onloadCallbackId]: onloadCallback})
    const scriptElement = document.createElement('script');
    scriptElement.src = `https://www.google.com/recaptcha/api.js?onload=${onloadCallbackId}&render=explicit`
    document.head.appendChild(scriptElement);
    addedScript = true;
  }

  return recaptcha;
}
