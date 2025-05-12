const aliases = [
  {
    name: "va-unsorted",
    resolve: () => ({
      // Custom class: sort icon is invisible until hovered
      class: `fa-solid fa-sort va-icon--hidden-before-hover`,
    }),
  },
  { name: "va-sort-asc", to: "fa-sort-up" },
  { name: "va-sort-desc", to: "fa-sort-down" },
  { name: "va-arrow-first", to: "fa-backward-step" },
  { name: "va-arrow-last", to: "fa-forward-step" },
  { name: "va-arrow-right", to: "fa-angle-right" },
  { name: "va-arrow-left", to: "fa-angle-left" },
  { name: "va-arrow-down", to: "fa-angle-down" },
  { name: "va-arrow-up", to: "fa-angle-up" },
  { name: "va-calendar", to: "fa-regular fa-calendar" },
  { name: "va-delete", to: "fa-trash" },
  { name: "va-check", to: "fa-check" },
  { name: "va-check-circle", to: "fa-circle-check" },
  { name: "va-warning", to: "fa-triangle-exclamation" },
  { name: "va-clear", to: "fa-regular fa-circle-xmark" },
  { name: "va-close", to: "fa-xmark" },
  { name: "va-loading", to: "fa-solid fa-rotate fa-flip-vertical" },
  { name: "va-plus", to: "fa-plus" },
  { name: "va-minus", to: "fa-minus" },
];
