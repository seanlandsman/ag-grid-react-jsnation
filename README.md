# JSNation - AG Grid React Workshop 

## Section: 4 - Adding Filters

Add simple column filter renderer:

First remove cell renderer component and references, cellRendererParams and selector, as well as enterprise 
references.

Add default filter to athlete column:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

// import 'ag-grid-enterprise'

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete', filter:true},
        {field: 'age'},
        {field: 'country'},
        {field: 'year',},
        {field: 'date'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'},
        {field: 'total'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
    }), []);

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                ref={gridRef}
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

Add community filters including date comparator: 

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

// import 'ag-grid-enterprise'

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athlete',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'age',
            filter: 'agNumberColumnFilter',
        },
        {field: 'country'},
        {field: 'year',},
        {
            field: 'date',
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: (dateFromFilter, cellValue) => {
                    const dateAsString = cellValue;
                    if (dateAsString == null) return -1
                    const dateParts = dateAsString.split('/');
                    const cellDate = new Date(
                        Number(dateParts[2]),
                        Number(dateParts[1]) - 1,
                        Number(dateParts[0])
                    );

                    if (dateFromFilter.getTime() === cellDate.getTime()) {
                        return 0
                    }

                    if (cellDate < dateFromFilter) {
                        return -1
                    }

                    if (cellDate > dateFromFilter) {
                        return 1
                    }
                }
            }
        }
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        flex: 1,
        filterParams: {
            buttons: ['apply', 'clear']
        }
    }), []);

    return (
        <div className='ag-theme-alpine' style={{height: 500}}>
            <AgGridReact
                ref={gridRef}
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

Add Save and Apply buttons to demonstrate using filter models:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

// import 'ag-grid-enterprise'

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athlete',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'age',
            filter: 'agNumberColumnFilter',
        },
        {field: 'country'},
        {field: 'year',},
        {
            field: 'date',
            filter: 'agDateColumnFilter'
        }
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        flex: 1
    }), []);

    const savedFilterState = useRef();

    const onBtSave = useCallback( ()=> {
        const filterModel = gridRef.current.api.getFilterModel();
        console.log('Saving Filter Model', filterModel);
        savedFilterState.current = filterModel;
    }, []);

    const onBtApply = useCallback( ()=> {
        const filterModel = savedFilterState.current;
        console.log('Applying Filter Model', filterModel);
        gridRef.current.api.setFilterModel(filterModel);
    }, []);

    return (
        <div style={{height: 500}}>
            <div>
                <button onClick={onBtSave}>Save</button>
                <button onClick={onBtApply}>Apply</button>
            </div>
            <div className="ag-theme-alpine" style={{height: '100%'}}>
                <AgGridReact ref={gridRef}
                             rowData={rowData} animateRows={true}
                             columnDefs={columnDefs} defaultColDef={defaultColDef}
                />
            </div>
        </div>
    );
}

export default App;
```

Add floating filters and enterprise filters:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-enterprise'

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete', filter: 'agTextColumnFilter'},
        {field: 'age', filter: 'agNumberColumnFilter',},
        {field: 'country', filter: 'agMultiColumnFilter'},
        {field: 'year', filter: 'agSetColumnFilter'},
        {field: 'date', filter: 'agDateColumnFilter'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        flex: 1,
        floatingFilter: true
    }), []);

    const savedFilterState = useRef();

    const onBtSave = useCallback(() => {
        const filterModel = gridRef.current.api.getFilterModel();
        console.log('Saving Filter Model', filterModel);
        savedFilterState.current = filterModel;
    }, []);

    const onBtApply = useCallback(() => {
        const filterModel = savedFilterState.current;
        console.log('Applying Filter Model', filterModel);
        gridRef.current.api.setFilterModel(filterModel);
    }, []);

    return (
        <div style={{height: 500}}>
            <div>
                <button onClick={onBtSave}>Save</button>
                <button onClick={onBtApply}>Apply</button>
            </div>
            <div className="ag-theme-alpine" style={{height: '100%'}}>
                <AgGridReact ref={gridRef}
                             rowData={rowData}
                             animateRows={true}
                             columnDefs={columnDefs}
                             defaultColDef={defaultColDef}
                />
            </div>
        </div>
    );
}

export default App;
```

Demonstrate popupParent:

```
import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-enterprise'

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete', filter: 'agTextColumnFilter'},
        {field: 'age', filter: 'agNumberColumnFilter',},
        {field: 'country', filter: 'agMultiColumnFilter'},
        {field: 'year', filter: 'agSetColumnFilter'},
        {field: 'date', filter: 'agDateColumnFilter'}
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        flex: 1,
        floatingFilter: true
    }), []);

    const savedFilterState = useRef();

    const onBtSave = useCallback(() => {
        const filterModel = gridRef.current.api.getFilterModel();
        console.log('Saving Filter Model', filterModel);
        savedFilterState.current = filterModel;
    }, []);

    const onBtApply = useCallback(() => {
        const filterModel = savedFilterState.current;
        console.log('Applying Filter Model', filterModel);
        gridRef.current.api.setFilterModel(filterModel);
    }, []);

    return (
        <div style={{height: 300}}>
            <div>
                <button onClick={onBtSave}>Save</button>
                <button onClick={onBtApply}>Apply</button>
            </div>
            <div className="ag-theme-alpine" style={{height: '100%'}}>
                <AgGridReact ref={gridRef}
                             rowData={rowData}
                             animateRows={true}
                             columnDefs={columnDefs}
                             defaultColDef={defaultColDef}
                             popupParent={document.body}
                />
            </div>
        </div>
    );
}

export default App;
```
