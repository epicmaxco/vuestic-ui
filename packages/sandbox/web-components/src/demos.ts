import demos from '#demos'

const transformBind = (el: HTMLElement, scripts: string[]) => {
  if (!el.attributes) { return }

  const scripttext = scripts.join('\n\n')

  const newAttrs: Record<string, string> = {}

  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i]

    if (!attr.name.startsWith(':')) {
      continue
    }
    try {
      newAttrs[attr.name] = eval(scripttext + '\n' + attr.value)
    } catch (e) {
      console.error(scripttext + '\n' + attr.value)
      throw new Error(`Unable to parse ${attr.value}\n` + e)
    }
  }

  Object.keys(newAttrs).forEach((attr) => {
    el.removeAttribute(attr)
    el[attr.replace(':', '')] = newAttrs[attr]
  })
}

const transformBinds = (els: NodeListOf<ChildNode>, scripts: string[] = []) => {
  els.forEach((el) => {
    if (el.nodeName === 'SCRIPT') {
      scripts.push(el.textContent)
    }

    transformBind(el as HTMLElement, scripts)
    transformBinds(el.childNodes, scripts)
  })
}

export default demos
  .map((content) => {
    try {
      const rows = content.match(/<(?:.|\n)*v-props="(.*)"(?:.|\n)*>/gm) || []

      const rowProps = rows.map((row) => {
        return row.match(/<(?:.|\n)*v-props="(.*)"(?:.|\n)*>/m)[1]
      })

      const div = document.createElement('div')
      div.innerHTML = content
      div.classList.add('demo')

      rowProps.forEach((value) => {
        const el = div.querySelector(`[v-props="${value}"]`)

        if (!el) {
          throw new Error(`Can not find el with selector [v-props="${value}"]`)
        }

        el['v-props'] = undefined

        const props = JSON.parse(`${value.replaceAll(`'`, `"`)}`)

        Object.entries(props).forEach(([prop, value]) => {
          el[prop] = value
        })
      })

      transformBinds(div.childNodes)

      return div
    } catch (e) {
      console.error('Error during processing', content)
      throw new Error(e)
    }
  })

