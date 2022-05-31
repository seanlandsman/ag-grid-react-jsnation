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
