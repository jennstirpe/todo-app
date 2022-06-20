import React from 'react'
import { StyledFilters } from './styled/TodoFilters.styled'

export default function TodoFilters({ countRemaining, setFilter, handleClear }) {


    

  return (
    <StyledFilters>
        <p className="remaining">{countRemaining()}</p>
        <div className="filters">
            <button className="filter active" onClick={() => setFilter('all')}>All</button>
            <button className="filter" onClick={() => setFilter('active')}>Active</button>
            <button className="filter" onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className="clear" onClick={handleClear}>Clear Completed</button>
    </StyledFilters>
  )
}
