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
        fetch('http://localhost:3000/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData));
    })

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        enableRowGroup: true
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
                rowGroupPanelShow='always'
            />
        </div>
    );
}

export default App;
