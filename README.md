# JSNation - AG Grid React Workshop 

## Section: 5 - Adding Custom Filters

Create a custom filter - no model at this stage:


yearFilter.js

```jsx
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react';

export default forwardRef((props, ref) => {
    const [filterState, setFilterState] = useState('off');

    useImperativeHandle(ref, () => {
        return {
            isFilterActive() {
                return filterState !== 'off';
            },
            doesFilterPass(params) {
                return params.data.year === 2008;
            },
            getModel() {
                return undefined;
            },
            setModel(model) {
            }
        };
    });

    useEffect(() => props.filterChangedCallback(), [filterState])

    const onListener = useCallback(() => setFilterState('on'), [])
    const offListener = useCallback(() => setFilterState('off'), [])

    return (
        <>
            <div>Year Filter</div>
            <label>
                Filter Off
                <input type="radio" name='rbYarFilter' onChange={offListener} checked={filterState === 'off'}/>
            </label>
            <label>
                Filter On
                <input type="radio" name='rbYarFilter' onChange={onListener} checked={filterState === 'on'}/>
            </label>
        </>
    );
});
```

App.js

```
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
        {field: 'age'},
        {field: 'country'},
        {field: 'year', filter: YearFilter},
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

Make Custom Filter Generic

YearFilter

```
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';

export default forwardRef((props, ref) => {
    const [filterState, setFilterState] = useState('off');

    useImperativeHandle(ref, () => {
        return {
            isFilterActive() {
                return filterState !== 'off';
            },
            doesFilterPass(params) {
                const {field} = props.colDef;
                return params.data[field] === filterState;
            },
            getModel() {
                return undefined;
            },
            setModel(model) {
            }
        };
    });

    useEffect(() => props.filterChangedCallback(), [filterState])

    return (
        <>
            <div>{props.title}</div>
            <div>State: {filterState}</div>
            <div>
                <button onClick={() => setFilterState('off')}>Off</button>
            </div>
            {props.values.map(value => (
                <div key={value}>
                    <button onClick={() => setFilterState(value)}>{value}</button>
                </div>
            ))}
        </>
    );
});
```

App
```
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

Add Filter State Logic

YearFilter

```
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';

export default forwardRef((props, ref) => {
    const [filterState, setFilterState] = useState('off');

    useImperativeHandle(ref, () => {
        return {
            isFilterActive() {
                return filterState !== 'off';
            },
            doesFilterPass(params) {
                const {field} = props.colDef;
                return params.data[field] === filterState;
            },
            getModel() {
                if(filterState === 'off') {
                    return undefined;
                }
                return {
                    state: filterState
                }
            },
            setModel(model) {
                if(model === null) {
                    setFilterState('off')
                } else {
                    setFilterState(model.state)
                }
            }
        };
    });

    useEffect(() => props.filterChangedCallback(), [filterState])

    return (
        <>
            <div>{props.title}</div>
            <div>State: {filterState}</div>
            <div>
                <button onClick={() => setFilterState('off')}>Off</button>
            </div>
            {props.values.map(value => (
                <div key={value}>
                    <button onClick={() => setFilterState(value)}>{value}</button>
                </div>
            ))}
        </>
    );
});
```

Enable Floating Filter

YearFilter
```
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';

export default forwardRef((props, ref) => {
    const [filterState, setFilterState] = useState('off');

    useImperativeHandle(ref, () => {
        return {
            doSomething() {
                alert('Special Method on Custom Filter')
            },
            isFilterActive() {
                return filterState !== 'off';
            },
            doesFilterPass(params) {
                const {field} = props.colDef;
                return params.data[field] === filterState;
            },
            getModel() {
                if(filterState === 'off') {
                    return undefined;
                }
                return {
                    state: filterState
                }
            },
            setModel(model) {
                if(model === null) {
                    setFilterState('off')
                } else {
                    setFilterState(model.state)
                }
            },
            getModelAsString() {
                return filterState === 'off' ? '' : filterState;
            }
        };
    });

    useEffect(() => props.filterChangedCallback(), [filterState])

    return (
        <>
            <div>{props.title}</div>
            <div>State: {filterState}</div>
            <div>
                <button onClick={() => setFilterState('off')}>Off</button>
            </div>
            {props.values.map(value => (
                <div key={value}>
                    <button onClick={() => setFilterState(value)}>{value}</button>
                </div>
            ))}
        </>
    );
});
```

App

```
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

Add Bespoke Method on Custom Filter

```
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';

export default forwardRef((props, ref) => {
    const [filterState, setFilterState] = useState('off');

    useImperativeHandle(ref, () => {
        return {
            doSomething() {
                alert('Special Method on Custom Filter')
            },
            isFilterActive() {
                return filterState !== 'off';
            },
            doesFilterPass(params) {
                const {field} = props.colDef;
                return params.data[field] === filterState;
            },
            getModel() {
                if(filterState === 'off') {
                    return undefined;
                }
                return {
                    state: filterState
                }
            },
            setModel(model) {
                if(model === null) {
                    setFilterState('off')
                } else {
                    setFilterState(model.state)
                }
            },
            getModelAsString() {
                return filterState === 'off' ? '' : filterState;
            }
        };
    });

    useEffect(() => props.filterChangedCallback(), [filterState])

    return (
        <>
            <div>{props.title}</div>
            <div>State: {filterState}</div>
            <div>
                <button onClick={() => setFilterState('off')}>Off</button>
            </div>
            {props.values.map(value => (
                <div key={value}>
                    <button onClick={() => setFilterState(value)}>{value}</button>
                </div>
            ))}
        </>
    );
});
```

App

```
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
```

