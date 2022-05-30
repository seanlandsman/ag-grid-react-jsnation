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
        {"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},
        {"athlete":"Libby Lenton-Trickett","age":23,"country":"Australia","year":2008,"date":"24/08/2008","sport":"Swimming","gold":2,"silver":1,"bronze":1,"total":4},
        {"athlete":"Shawn Johnson","age":16,"country":"United States","year":2008,"date":"24/08/2008","sport":"Gymnastics","gold":1,"silver":3,"bronze":0,"total":4}
    ];
    const columnDefs = [
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
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
        {"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},
        {"athlete":"Libby Lenton-Trickett","age":23,"country":"Australia","year":2008,"date":"24/08/2008","sport":"Swimming","gold":2,"silver":1,"bronze":1,"total":4},
        {"athlete":"Shawn Johnson","age":16,"country":"United States","year":2008,"date":"24/08/2008","sport":"Gymnastics","gold":1,"silver":3,"bronze":0,"total":4}
    ];
    const columnDefs = [
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
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
        {"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},
        {"athlete":"Libby Lenton-Trickett","age":23,"country":"Australia","year":2008,"date":"24/08/2008","sport":"Swimming","gold":2,"silver":1,"bronze":1,"total":4},
        {"athlete":"Shawn Johnson","age":16,"country":"United States","year":2008,"date":"24/08/2008","sport":"Gymnastics","gold":1,"silver":3,"bronze":0,"total":4}
    ]);
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
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

First, download [row data](https://www.ag-grid.com/example-assets/olympic-winners.json) and save it under `public` as `row-data.json.

Then add the fetch: 

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useEffect, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

function App() {
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/row-data.json')
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
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/row-data.json')
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
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/row-data.json')
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
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/row-data.json')
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
        {field: 'athlete'},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/row-data.json')
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
