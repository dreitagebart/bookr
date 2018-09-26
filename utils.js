import XLSX from 'xlsx'
import tcpPortUsed from 'tcp-port-used'

export const check = (port, fn) => {
  tcpPortUsed.check(port, '127.0.0.1').then(
    inUse => {
      fn(null, inUse)
      console.log('Port ' + port + ' usage: ' + inUse)
    },
    error => {
      fn(error)
      console.error('Error on check:', error.message)
    }
  )
}

export const buildExcel = (data, filePath) => {
  const workbook = XLSX.utils.book_new()

  workbook.Props = {
    Title: 'SheetJS Tutorial',
    Subject: 'Test file',
    Author: 'Your name here',
    CreatedDate: new Date()
  }

  workbook.SheetNames.push('Zeitabrechnungen')

  const worksheetData = [['Hallo', 'Welt']]

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

  workbook.Sheets['Zeitabrechnungen'] = worksheet

  const workbookOptions = {
    bookType: 'xlsx'
  }

  XLSX.writeFile(workbook, filePath, workbookOptions)
  // You can define styles as json object
  // const styles = {
  //   header: {
  //     fill: {
  //       fgColor: {
  //         rgb: 'FFCFCFCF'
  //       }
  //     },
  //     font: {
  //       color: {
  //         rgb: 'FF666666'
  //       },
  //       sz: 24,
  //       bold: true,
  //       underline: false
  //     }
  //   },
  //   headerTitle: {
  //     fill: {
  //       fgColor: {
  //         rgb: 'FFCFCFCF'
  //       }
  //     },
  //     font: {
  //       color: {
  //         rgb: 'FF333333'
  //       },
  //       sz: 16,
  //       bold: true,
  //       underline: false
  //     }
  //   },
  //   project: {
  //     fill: {
  //       fgColor: {
  //         rgb: 'FFEFEFEF'
  //       }
  //     },
  //     font: {
  //       color: {
  //         rgb: 'FF333333'
  //       },
  //       sz: 16,
  //       bold: true,
  //       underline: false
  //     }
  //   },
  //   created: {
  //     font: {
  //       color: {
  //         rgb: 'FF666666'
  //       },
  //       sz: 14,
  //       bold: true,
  //       underline: false
  //     }
  //   },
  //   dataRow: {
  //     fill: {
  //       fgColor: {
  //         rgb: 'FFFFFFFF'
  //       }
  //     },
  //     font: {
  //       color: {
  //         rgb: 'FF666666'
  //       },
  //       sz: 14,
  //       bold: false,
  //       underline: false
  //     }
  //   }
  // }

  // const date = new Date()
  // const days = date.getDate()
  // const months = padStart(date.getMonth() + 1, 2, '0')
  // const years = date.getFullYear()

  // const hours = date.getHours()
  // const minutes = date.getMinutes()

  // const created = `created ${days}.${months}.${years} ${hours}:${minutes}`

  // //Array of objects representing heading rows (very top)
  // const heading = [
  //   [{ value: 'bookr Export sheet', style: styles.header }],
  //   [{ value: created, style: styles.created }],
  //   [''] // <-- It can be only values
  // ]

  // // Define an array of merges. 1-1 = A:1
  // // The merges are independent of the data.
  // // A merge will overwrite all data _not_ in the top-left cell.
  // const merges = [
  //   { start: { row: 1, column: 1 }, end: { row: 1, column: 3 } },
  //   { start: { row: 2, column: 1 }, end: { row: 2, column: 3 } },
  //   { start: { row: 3, column: 1 }, end: { row: 3, column: 3 } }
  // ]

  // //Here you specify the export structure
  // const specification = {
  //   date: {
  //     // <- the key should match the actual data key
  //     displayName: 'date', // <- Here you specify the column header
  //     headerStyle: styles.headerTitle, // <- Header style
  //     cellStyle: function(value, row) {
  //       // <- style renderer function
  //       // if the status is 1 then color in green else color in red
  //       // Notice how we use another cell value to style the current one
  //       return row.project ? styles.project : styles.dataRow

  //       // return row.status_id == 1 ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } } // <- Inline cell style is possible
  //     },
  //     cellFormat: function(value, row) {
  //       return row.project ? row.project : value
  //     },
  //     width: 200 // <- width in pixels
  //   },
  //   time: {
  //     // <- the key should match the actual data key
  //     displayName: 'time', // <- Here you specify the column header
  //     headerStyle: styles.headerTitle, // <- Header style
  //     cellStyle: styles.dataRow,
  //     // cellStyle: function(value, row) {
  //     //   // <- style renderer function
  //     //   // if the status is 1 then color in green else color in red
  //     //   // Notice how we use another cell value to style the current one
  //     //   return row.status_id == 1 ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } } // <- Inline cell style is possible
  //     // },
  //     width: 200 // <- width in pixels
  //   },
  //   total: {
  //     displayName: 'booked',
  //     headerStyle: styles.headerTitle,
  //     cellStyle: styles.dataRow,
  //     // cellFormat: function(value, row) {
  //     //   // <- Renderer function, you can access also any row.property
  //     //   return value == 1 ? 'Active' : 'Inactive'
  //     // },
  //     width: 120 // <- width in chars (when the number is passed as string)
  //   }
  //   // note: {
  //   //   displayName: 'Description',
  //   //   headerStyle: styles.booked,
  //   //   cellStyle: styles.cellPink, // <- Cell style
  //   //   width: 220 // <- width in pixels
  //   // }
  // }

  // // The data set should have the following shape (Array of Objects)
  // // The order of the keys is irrelevant, it is also irrelevant if the
  // // dataset contains more fields as the report is build based on the
  // // specification provided above. But you should have all the fields
  // // that are listed in the report specification
  // const dataset = []
  // let i = 4

  // data.map((project, index) => {
  //   i++
  //   merges.push({ start: { row: i, column: 1 }, end: { row: i, column: 3 } })

  //   dataset.push({
  //     project: project.title,
  //     date: '',
  //     time: '',
  //     total: ''
  //   })

  //   if (project.bookings) {
  //     project.bookings.map(book => {
  //       dataset.push({
  //         date: book.date,
  //         time: book.time,
  //         total: book.value
  //       })

  //       i++
  //     })
  //   } else {
  //     dataset.push({
  //       date: 'no bookings',
  //       time: '',
  //       total: '-'
  //     })
  //     i++
  //   }
  // })

  // // Create the excel report.
  // // This function will return Buffer
  // const report = excel.buildExport([
  //   // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
  //   {
  //     name: 'bookr Export', // <- Specify sheet name (optional)
  //     heading: heading, // <- Raw heading array (optional)
  //     merges: merges, // <- Merge cell ranges
  //     specification: specification, // <- Report specification
  //     data: dataset // <-- Report data
  //   }
  // ])

  // fs.writeFileSync(filePath, report)
}
