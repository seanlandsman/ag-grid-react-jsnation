# JSNation - AG Grid React Workshop 

## Section: 1 - Quickstart Tutorial for the React Data Grid from AG Grid

Create empty React application with CRA:

`npx create-react-app hello`

Install AG Grid Dependencies

```
cd hello
npm install --save ag-grid-community ag-grid-react
```

Import AG Grid React component and specify rows and columns:

```
import './App.css';

import {AgGridReact} from "ag-grid-react";

function App() {
    const rowData = [
        {make: 'Ford', model: 'Focus', price: 40000},
        {make: 'Toyota', model: 'Celica', price: 45000},
        {make: 'BMW', model: '4 Series', price: 50000}
    ];
    const columnDefs = [
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ];

    return (<div>
        <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
        />
    </div>);
}

export default App;
```

Add AG Grid and Theme CSS, specify theme and height on parent div:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {AgGridReact} from "ag-grid-react";

function App() {
    const rowData = [
        {make: 'Ford', model: 'Focus', price: 40000},
        {make: 'Toyota', model: 'Celica', price: 45000},
        {make: 'BMW', model: '4 Series', price: 50000}
    ];
    const columnDefs = [
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ];

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
            />
        </div>
    );
}

export default App;
```

Update to use useState for row and columns:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const [rowData, setRowData] = useState([
        {make: 'Ford', model: 'Focus', price: 40000},
        {make: 'Toyota', model: 'Celica', price: 45000},
        {make: 'BMW', model: '4 Series', price: 50000}
    ]);
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]);

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
            />
        </div>
    );
}

export default App;
```

Get row data from an external source:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useEffect, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })
    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
            />
        </div>
    );
}

export default App;
```

Add default column properties:
```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useEffect, useMemo, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}

export default App;
```

Add grid properties (animateRows and rowSelection): 

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useEffect, useMemo, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
            />
        </div>
    );
}

export default App;
```

Add event listener (cell clicked): 

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    const cellClickedListener = useCallback(e => {
        console.log('cellClicked', e);
    }, [])

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                onCellClicked={cellClickedListener}
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
            />
        </div>
    );
}

export default App;
```

Add Grid API reference: 

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    const cellClickedListener = useCallback(e => {
        console.log('cellClicked', e);
    }, [])

    const pushMeClicked = useCallback(e => gridRef.current.api.deselectAll(), []);

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <button onClick={pushMeClicked}>Push Me</button>
            <AgGridReact
                ref={gridRef}
                onCellClicked={cellClickedListener}
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowSelection='multiple'
            />
        </div>
    );
}

export default App;
```
