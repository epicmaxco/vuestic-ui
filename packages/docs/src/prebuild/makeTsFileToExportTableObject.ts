export const makeTsFileToExportTableObject = (obj: any) => {
  return `import {Table} from "../../components/DocsTable/DocsTableTypes";

const table : Table = ${JSON.stringify(obj)}

export default table`
}
