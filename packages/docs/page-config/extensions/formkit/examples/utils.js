export { axios, camel2title }

// This is just a mock of an actual axios instance.
const axios = {
  post: (formData) => {
    return new Promise((resolve, reject) => {
      let response = { status: 200 }
      if (formData.organizationInfo.org_name.toLowerCase().trim() !== 'formkit') {
        response = {
          status: 400,
          formErrors: ['There was an error in this form, please correct and re-submit to validate.'],
          fieldErrors: {
            'organizationInfo.org_name': 'Organization Name must be "FormKit", we tricked you!'
          }
        }
      }
      setTimeout(() => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }, 1500)
    })

  }
}

const camel2title = (str) => str
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase())
  .trim()
