import { ref, type Ref } from "vue";
import { type TemplateRef, unwrapEl } from "../../../utils/unwrapEl";
import { useEvent } from "../event/useEvent";

export const useMouse = (el?: Ref<TemplateRef>) => {
  const mouseX = ref(0);
  const mouseY = ref(0);
  const mouseMoveX = ref(0);
  const mouseMoveY = ref(0);

  useEvent(
    "mousemove",
    (event: MouseEvent) => {
      const target = unwrapEl(el?.value);

      if (!target) {
        mouseX.value = event.clientX;
        mouseY.value = event.clientX;
        mouseMoveX.value = event.movementX
        mouseMoveY.value = event.movementY;

        return;
      }

      const rect = target.getBoundingClientRect();

      mouseX.value = event.clientX - rect.left;
      mouseY.value = event.clientY - rect.top;
      mouseMoveX.value = event.movementX
      mouseMoveY.value = event.movementY;
    },
    el
  );

  useEvent(
    "mouseleave",
    () => {
      mouseX.value = 0;
      mouseY.value = 0;
    },
    el
  );

  return {
    mouseX,
    mouseY,
    mouseMoveX,
    mouseMoveY,
  }
}
