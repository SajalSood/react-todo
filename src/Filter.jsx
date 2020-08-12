import React, { useState } from 'react';


const Filter = ({filterState, onFilter, sortState, onSort}) =>{
    const [sorter, setSort] = useState(sortState);
    const [filter, setFilter] = useState(filterState);

    const filterTasks = (e) => {
        setFilter(e.target.value);
        onFilter(e.target.value);
    };

    const sortTasks = (e) => {
        setSort(e.target.value);
        onSort(e.target.value);
    };

    const refreshTasks = (e) => {
        onSort();
        onFilter();
        setSort('1');
        setFilter('1');
    };

    return (
        <div className="filters">
            <div className="filter">
                <select value={ sorter } className="form-control form-select" onChange={ sortTasks }>
                    <option value="1">Sort By Name (A-Z)</option>
                    <option value="2">Sort By Name (Z-A)</option>
                    <option value="3">Sort By Done</option>
                    <option value="4">Sort By Not Done</option>
                </select>
                <select value={ filter } className="form-control form-select" onChange={ filterTasks }>
                    <option value="1">Show All</option>
                    <option value="2">Show Only Done</option>
                    <option value="3">Show Only Not Done</option>
                </select>
                <button className="btn btn-refresh" onClick={ refreshTasks }>Refresh</button>
            </div>
        </div>
    )
};

export default Filter;
