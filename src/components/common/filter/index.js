import React, { useState } from 'react'

export default function Filter({filters, handleFilter}) {

    const [filter_state, setFilterState] = useState(null)

  return (
    <>
        <div className='filter-container card p-3'>
        <h3 className="mx-3 card-title">Search</h3>
            <div className='row m-0 p-0 card-body'>
                <div className='col-sm-10 col-md-10 col-xl-10'>
                    {
                        filters.map((filter, index) => (
                            <div key={index}>
                                <div className='form-group'>
                                    {/* <lable htmlFor={`${filter.field}`}>{}</lable> */}
                                    <input
                                        className='form-control w-100'
                                        {...filter.inputConfig}
                                        value={filter_state || ""}
                                        onChange={(e) => setFilterState(e.target.value)}
                                        onKeyUp={() => handleFilter(filter_state)}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='col-sm-2 col-md-2 col-xl-2'>
                    <button
                        type='button'
                        className='btn btn-primary btn-sm mr-3'
                        onClick={() => handleFilter(filter_state)}
                    >
                        <span>Search</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
