type Block = { start: { source: number, output: number }, end: { source: number, output: number }, type: string, source: string }


export const makeDiffSyncByRow = (original: string, modified: string) => {
  const originalLines = original.split('\n')
  const modifiedLines = modified.split('\n')

  let sourceShift = 0
  let outputShift = 0
  const blocks = []

  for (let i = 0; i < Math.max(originalLines.length, modifiedLines.length); i++) {
    const sourceLine = (originalLines[i] ?? '') + '\n'
    const modifiedLine = (modifiedLines[i] ?? '') + '\n'

    if (sourceLine === modifiedLine) {
      blocks.push({
        type: 'equal',
        start: { source: sourceShift, output: outputShift },
        end: {
          source: sourceShift + sourceLine.length,
          output: outputShift + sourceLine.length,
        },
        source: sourceLine,
      })
    } else {
      const lineDiff = makeDiffSync(sourceLine, modifiedLine)
      for (const block of lineDiff) {
        blocks.push({
          ...block,
          start: {
            source: block.start.source + sourceShift,
            output: block.start.output + outputShift,
          },
          end: {
            source: block.end.source + sourceShift,
            output: block.end.output + outputShift,
          },
        })
      }
    }

    sourceShift += sourceLine.length
    outputShift += modifiedLine.length
  }

  return mergeEqualBlocks(blocks)
}

const mergeEqualBlocks = (blocks: Block[]) => {
  return blocks.reduce((acc, block) => {
    const last = acc.at(-1)
    if (block.type === 'equal' && last?.type === 'equal') {
      last.source += block.source
      last.end = block.end
    } else {
      acc.push(block)
    }
    return acc
  }, [] as Block[])
}

const makeDiffSync = (source: string, output: string) => {
  let originalShift = 0
  let modifiedShift = 0

  function makeBlock(type: string, sourceStart: number, sourceEnd: number, outputStart: number, outputEnd: number) {
    const blockSource = type === 'insert' ? output.slice(outputStart, outputEnd) : source.slice(sourceStart, sourceEnd)

    return {
      start: {
        source: sourceStart,
        output: outputStart
      },
      end: {
        source: sourceEnd,
        output: outputEnd
      },
      type,
      source: blockSource
    }
  }

  const blocks = [
    makeBlock('equal', 0, 0, 0, 0),
  ]

  function findInsert(originalShift: number, modifiedShift: number) {
    const modifiedShiftStart = modifiedShift

    while (originalShift < source.length && modifiedShift < output.length) {
      if (output[modifiedShift] === source[originalShift]) {
        break
      }

      modifiedShift++
    }

    if (output.length < modifiedShiftStart) {
      return
    }

    return makeBlock('insert', originalShift, originalShift, modifiedShiftStart, modifiedShift)
  }

  function findDelete(originalShift: number, modifiedShift: number) {
    const originalShiftStart = originalShift

    while (originalShift < source.length && modifiedShift < output.length) {
      if (output[modifiedShift] === source[originalShift]) {
        return makeBlock('delete', originalShiftStart, originalShift, modifiedShift, modifiedShift)
      }

      originalShift++
    }
  }


  while (originalShift < source.length && modifiedShift < output.length) {
    const originalChar = source[originalShift]
    const modifiedChar = output[modifiedShift]

    const currentBlock = blocks[blocks.length - 1]

    if (originalChar === modifiedChar) {
      if (currentBlock.type === 'equal') {
        currentBlock.end.output++
        currentBlock.end.source++
        currentBlock.source = source.slice(currentBlock.start.source, currentBlock.end.source)
      } else {
        blocks.push(makeBlock('equal', originalShift, originalShift + 1, modifiedShift, modifiedShift + 1))
      }
      originalShift++
      modifiedShift++
    } else {
      const nextChain = findDelete(originalShift, modifiedShift)
      const insertBlock = findInsert(originalShift, modifiedShift)

      if (nextChain && insertBlock) {
        // Prioritize insert over deleting something in output string
        if (output.slice(modifiedShift).includes(nextChain.source)) {
          blocks.push(insertBlock)
          modifiedShift = insertBlock.end.output
          continue
        }

        blocks.push(nextChain)
        originalShift = nextChain.end.source
        continue
      }
      if (insertBlock) {
        blocks.push(insertBlock)
        modifiedShift = insertBlock.end.output
        continue
      }
      if (nextChain) {
        blocks.push(nextChain)
        originalShift = nextChain.end.source
        continue
      }

      break
    }
  }

  return blocks
}
