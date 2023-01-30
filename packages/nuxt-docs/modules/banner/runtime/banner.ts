import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin(() => {
  console.group('Vuestic Build Info');
  console.log('vuestic-ui:', "<%= options.VERSION %>");
  console.log('date:', "<%= options.DATE %>");
  console.log('commit:', "<%= options.COMMIT %>");
  console.groupEnd();
})
