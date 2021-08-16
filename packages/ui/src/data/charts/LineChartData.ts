import { colorToRgba } from '../../services/color-config/color-functions'

const generateValue = () => {
  return Math.floor(Math.random() * 100)
}

const generateYLabels = () => {
  const flip = !!Math.floor(Math.random() * 2)
  return flip ? ['Debit', 'Credit'] : ['Credit', 'Debit']
}

const generateArray = (length: any) => {
  return Array.from(Array(length), generateValue)
}

const getSize = () => {
  const minSize = 4
  return minSize + Math.floor(Math.random() * 3)
}

let generatedData: any

export const getLineChartData = (themes: any) => {
  const size = getSize()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const yLabels = generateYLabels()

  if (generatedData) {
    generatedData.datasets[0].backgroundColor = colorToRgba(themes.primary, 0.6)
    generatedData.datasets[1].backgroundColor = colorToRgba(themes.info, 0.6)
  } else {
    generatedData = {
      labels: months.splice(0, size),
      datasets: [
        {
          label: yLabels[0],
          backgroundColor: colorToRgba(themes.primary, 0.6),
          borderColor: 'transparent',
          data: generateArray(size),
        },
        {
          label: yLabels[1],
          backgroundColor: colorToRgba(themes.info, 0.6),
          borderColor: 'transparent',
          data: generateArray(size),
        },
      ],
    }
  }

  return generatedData
}
