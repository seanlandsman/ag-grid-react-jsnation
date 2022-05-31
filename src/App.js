import './App.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";

import YearFilter from "./yearFilter";

function App() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete'},
        {
            field: 'age',
            filter: YearFilter,
            floatingFilter: true,
            filterParams: {
                title: 'My Filter',
                values: [18, 23]
            }
        },
        {field: 'country'},
        {
            field: 'year',
            filter: YearFilter,
            filterParams: {
                title: 'My Filter',
                values: [2004, 2006, 2008]
            }
        },
        {field: 'date'}
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

    const onBtnCustomApi = useCallback(() => {
        gridRef.current.api.getFilterInstance('year', instance => instance.doSomething());
    })
    return (
        <div style={{height: 500}}>
            <div>
                <button onClick={onBtSave}>Save</button>
                <button onClick={onBtApply}>Apply</button>
                <button onClick={onBtnCustomApi}>Year Filter Method</button>
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
