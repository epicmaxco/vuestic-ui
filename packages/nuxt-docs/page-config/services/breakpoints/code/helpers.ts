setup: () => {
  const breakpoint = useBreakpoint();
  if (breakpoint.xl) {
    console.log("It's XL breakpoint!");
  }
};
