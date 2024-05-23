import { getLocalStorage } from '../utils/localStorage'

enum ContinentCodes {
  NorthAmerica = 'NA',
  Europe = 'EU'
}

const SHOW_MODAL_DELAY = 10000;

const TARGET_REGIONS = [
  ContinentCodes.NorthAmerica,
  ContinentCodes.Europe,
]

export const useRequestAuditModal = () => {
  const wasRequestAuditModalShownStorageKey = 'wasRequestAuditModalShown'

  const needShowRequestAuditModal = ref(false)
  const showRequestAuditModal = ref(false)

  const startTs = Date.now()

  onMounted(async () => {
    const localStorage = getLocalStorage()

    const wasShown = Boolean(localStorage?.getItem(
      wasRequestAuditModalShownStorageKey
    ))

    if (wasShown) {
      return
    }

    try {
      const response = await fetch('https://freeipapi.com/api/json/')
      const json = await response.json()
      needShowRequestAuditModal.value = TARGET_REGIONS.includes(json.continentCode);
    } catch (e) { /* empty */ }

    if (needShowRequestAuditModal.value) {
      setTimeout(() => {
        showRequestAuditModal.value = true
      }, startTs + SHOW_MODAL_DELAY - Date.now())
    }
  })

  const onRequestAuditModalShown = () => {
    getLocalStorage()?.setItem(wasRequestAuditModalShownStorageKey, '1')
  }

  return {
    needShowRequestAuditModal,
    showRequestAuditModal,
    onRequestAuditModalShown,
  }
}
