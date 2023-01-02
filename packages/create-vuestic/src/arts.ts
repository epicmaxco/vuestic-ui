import chalk from "chalk"

export const logo = `
#####        /////
 #####      /////
  #####    /////
   #####  /////
    #####/////
     #####///
      ####//
       ####
`

export const error = `
:(
`
export const primaryColor = (text: string) => {
  return chalk.hex('#154EC1')(text)
}
