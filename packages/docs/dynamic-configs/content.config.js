function getHeader(text) {
  return (
    text && {
      component: 'h1',
      text
    }
  )
}

function getSubheader(text) {
  return (
    text && {
      component: 'h3',
      text
    }
  )
}

function getParagraph(text) {
  return (
    text && {
      component: 'p',
      text
    }
  )
}

function getApiTable(data) {
  return {
    component: 'va-data-table',
    componentProps: {
      fields: [
        {
          name: 'property',
          label: 'Property',
        },
        {
          name: 'description',
          label: 'Description',
        },
        {
          name: 'type',
          label: 'Type'
        },
        {
          name: 'default',
          label: 'Default'
        },
        {
          name: 'version',
          label: 'Version'
        },
      ],
      noPagination: true,
      data
    }
  }
}

function getTextContent(options) {
  return [getHeader(options.header), getSubheader(options.subheader), getParagraph(options.desc)].filter(Boolean)
}

export default componentConfig => ({
  component: 'va-content',
  children: componentConfig.sections.reduce((acc, section) => {
    acc.push(...getTextContent(section))
    if (section.dynamicContent) {
      acc.push(...section.dynamicContent)
    }
    if (section.type === 'api') {
      acc.push(getApiTable(section.tableData))
    }
    return acc
  }, [])
})
