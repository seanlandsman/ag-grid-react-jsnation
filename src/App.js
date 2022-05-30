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
