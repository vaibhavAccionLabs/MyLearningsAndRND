// import React from 'react';
// import './App.css';
// import { Customers } from './Customers';
// import { Header } from './Header';
// import { ExportReactCSV } from './ExportReactCSV';
// import { ExportCSV } from './ExportCSV';

// import { CSVLink } from 'react-csv';

// const headers = [
//   { label: 'First Name', key: 'firstname' },
//   { label: 'Last Name', key: 'lastname' },
//   { label: 'Email', key: 'email' }
// ];

// const data = [
//   { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
//   { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
//   { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
// ];

// class App extends React.Component {
//   customers = () => {
//     let custs = [];
//     for (let i = 0; i <= 25; i++) {
//       custs.push({
//         firstName: `first${i}`,
//         lastName: `last${i}`,
//         email: `abc${i}@gmail.com`,
//         address: `000${i} street city, ST`,
//         zipcode: `0000${i}`
//       });
//     }
//     return custs;
//   };

//   state = {
//     customers: this.customers(),
//     fileName: 'Customers'
//   };

//   render() {
//     return (
//       <div className="App">
//         <Header />
//         <CSVLink data={data} headers={headers}>
//           Download me
//         </CSVLink>
//         <div className="row">
//           <div className="col-md-8">
//             <h2>Customers</h2>
//           </div>
//           <div className="col-md-4 center">
//             <ExportCSV
//               csvData={this.state.customers}
//               fileName={this.state.fileName}
//             />
//           </div>
//         </div>
//         <Customers customers={this.customers()} />
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import ReactExport from 'react-export-excel';
import './App.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const multiDataSet = [
  {
    columns: [],
    data: [
      [
        {
          value: 'CSU And UC Applications Hands On Workshops',
          style: { font: { sz: '24', bold: true } }
        }
      ],
      [
        { value: 'created by:', style: { font: { bold: true } } },
        { value: 'vaibhav katariya', style: { font: { bold: true } } }
      ],
      [],
      [],
      [
        { value: 'H1', style: { font: { sz: '24', bold: true } } },
        { value: 'Bold', style: { font: { bold: true } } },
        {
          value: 'Red',
          style: {
            fill: { patternType: 'solid', fgColor: { rgb: 'FFFF0000' } }
          }
        }
      ],
      [
        { value: 'H2', style: { font: { sz: '18', bold: true } } },
        { value: 'underline', style: { font: { underline: true } } },
        {
          value: 'Blue',
          style: {
            fill: { patternType: 'solid', fgColor: { rgb: 'FF0000FF' } }
          }
        }
      ],
      [
        { value: 'H3', style: { font: { sz: '14', bold: true } } },
        { value: 'italic', style: { font: { italic: true } } },
        {
          value: 'Green',
          style: {
            fill: { patternType: 'solid', fgColor: { rgb: 'FF00FF00' } }
          }
        }
      ],
      [
        { value: 'H4', style: { font: { sz: '12', bold: true } } },
        { value: 'strike', style: { font: { strike: true } } },
        {
          value: 'Orange',
          style: {
            fill: { patternType: 'solid', fgColor: { rgb: 'FFF86B00' } }
          }
        }
      ],
      [
        { value: 'H5', style: { font: { sz: '10.5', bold: true } } },
        { value: 'outline', style: { font: { outline: true } } },
        {
          value: 'Yellow',
          style: {
            fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF00' } }
          }
        }
      ],
      [
        { value: 'H6', style: { font: { sz: '7.5', bold: true } } },
        { value: 'shadow', style: { font: { shadow: true } } },
        {
          value: 'Light Blue',
          style: {
            fill: { patternType: 'solid', fgColor: { rgb: 'FFCCEEFF' } }
          }
        }
      ]
    ]
  }
];

class App extends Component {
  render() {
    return (
      <div>
        <ExcelFile
          element={<button>Download Data With Styles</button>}
          filename={'student_list'}
        >
          <ExcelSheet dataSet={multiDataSet} name="Organization" />
        </ExcelFile>
      </div>
    );
  }
}

export default App;
