import { computed } from 'vue';

export const useSponsorIcon = (color: string, width: number, height: number, scale = 1) => {
  const calculateViewBox = () => {
    const newWidth = width / scale;
    const newHeight = height / scale;
    const deltaX = (newWidth - width) / 2;
    const deltaY = (newHeight - height) / 2;
    return `${-deltaX} ${-deltaY} ${newWidth} ${newHeight}`;
  };


  const { getColor } = useColors();
  const colorComputed = computed(() => getColor(color));

  return { viewBox: calculateViewBox(), colorComputed };
};
