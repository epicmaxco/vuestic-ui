export const getI18nConfigDefaults = () => ({
  // PROPS

  /** Select search field default text */
  search: 'Search',
  /** Select no options text */
  noOptions: 'Items not found',
  /** Modal Ok button default text */
  ok: 'Ok',
  /** Modal Cancel button default text */
  cancel: 'Cancel',
  /** FileUpload default button text */
  uploadFile: 'Upload file',
  /** FileUpload default undo button text */
  undo: 'Undo',
  /** FileUpload default dropzone text */
  dropzone: 'Drop files here to upload',
  /** FileUpload default file deleted alert text */
  fileDeleted: 'File deleted',

  // Aria attributes
  /** Alert close button aria-label */

  closeAlert: 'close alert',
  backToTop: 'back to top',
  toggleDropdown: 'toggle dropdown',
  carousel: 'carousel',
  goPreviousSlid: 'go previous slide',
  goNextSlid: 'go next slide',
  goSlide: 'go slide {index}',
  slideOf: 'slide {index} of {length}',
  close: 'close',
  openColorPicker: 'open color picker',
  colorSelection: 'color selection',
  colorName: 'color {color}',
  decreaseCounter: 'decrease counter',
  increaseCounter: 'increase counter',
  selectAllRows: 'select all rows',
  sortColumnBy: 'sort column by {name}',
  selectRowByIndex: 'select row {index}',
  resetDate: 'reset date',
  nextPeriod: 'next period',
  switchView: 'switch view',
  previousPeriod: 'previous period',
  removeFile: 'remove file',
  reset: 'reset',
  pagination: 'pagination',
  goToTheFirstPage: 'go to the first page',
  goToPreviousPage: 'go to the previous page',
  goToSpecificPage: 'go to the {page} page',
  goToSpecificPageInput: 'enter the page number to go',
  goNextPage: 'go next page',
  goLastPage: 'go last page',
  /** Rating aria-label */
  currentRating: 'current rating {value} of {max}',
  /** Rating item aria-label */
  voteRating: '`vote rating {value} of {max}`',
  /** Select search input aria-label */
  optionsFilter: 'options filter',
  splitPanels: 'split panels',
  movePaginationLeft: 'move pagination left',
  movePaginationRight: 'move pagination right',
  resetTime: 'reset time',
  closeToast: 'close toast',
  /**
   * Select aria-label selected option prefix
   *
   * @example
   *
   * `Selected option: {option}` or `Selected option: Animal`
   */
  selectedOption: 'Selected option',
  /** Select aria-label if no option is selected */
  noSelectedOption: 'Option is not selected',

  breadcrumbs: 'breadcrumbs',
  counterValue: 'counter value',
  selectedDate: 'selected date',
  selectedTime: 'selected time',
  progressState: 'progress state',
  color: 'color',
})

export type I18nConfig = ReturnType<typeof getI18nConfigDefaults>
