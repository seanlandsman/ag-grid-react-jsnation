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
