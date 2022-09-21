import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUser, updateUser } from '../../../feature/product/productThunk'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function SubscriberTable(props) {
  let {columns, users, handleUpdate, handlePagination, handleDeleteUser} = props
  const { success, loading } = useSelector((state) => state.product)
  const mySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState(1)
  const options = [
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 50, label: '50'},
  ]
  // const handleUpdateUser = (data) => {

  //   let { _id, isActive, isAdmin, email, isSubscriber, password } = data
  //   let temp_data = {_id, isActive, isAdmin, email, isSubscriber, password}
  //   temp_data.isActive = !(Boolean(temp_data.isActive))

  //   Swal.fire({
  //     title: 'Do you want to Perform Action',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     denyButtonText: `No`
  //   }).then((result) => {
  //     if(result.isConfirmed) {
  //       dispatch(updateUser(temp_data))
  //         Swal.fire('Success', '', 'success')    
  //     } else if(result.isDenied) {
  //       Swal.fire('Operation Canceled', '', 'info')
  //     }
  //   })
    
  // }

  // const handleUserDelete = (data) => {
  //   Swal.fire({
  //     title: 'Do you want to Perform Action',
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     denyButtonText: `No`
  //   }).then((result) => {
  //     if(result.isConfirmed) {
  //       dispatch(deleteUser(data))
  //         Swal.fire('Success', '', 'success')     
  //     } else if(result.isDenied) {
  //       Swal.fire('Operation Canceled', '', 'info')
  //     }
  //   })
  // }

  const handlePaginationValues = (e) => {
    let limit_temp = e.target.value
    let data = {limit: limit_temp, page}
    // dispatch(getAllUser(data))
    handlePagination(data)
    
  }

  return (
    <div className="table-container">
    <table className="table table-striped p-0">
      <thead className="table-header">
        {columns &&
          columns.map((column, index) => (
            <th scope="col" key={index}>
              {column}
            </th>
          ))}
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => (
            <tr scope="row" className={`user-table-row`} key={index}>
              <td>{user.email}</td>
              <td> 
                <button
                  className={`fw-bold btn btn-block subs-button ${
                    user.isActive === true
                      ? "bg-color-green"
                      : "bg-color-red "
                  } color-white custom-button-medium`}
                >
                  {user.isActive ? "Activated" : "Deactivated"}
                </button>
              </td>
              <td className="table-icon-group">
                <i className={` fa-solid ${user.isActive === true ? "fa-toggle-off" : "fa-toggle-on"} cursor-pointer`} onClick={() => handleUpdate(user)}></i>
                <i className="fa-solid fa-trash-alt cursor-pointer color-red" onClick={() => handleDeleteUser(user._id)}></i>
                {/* <i className="fa-solid fa-ban cursor-pointer"></i> */}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className="page-bottom-container d-flex flex-row align-items-center">
        {/* <div className="item-per-page">
            <span className="fw-bold">Item Per Page : </span>
            <select className="page-select"  onChange={handlePaginationValues} >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
        </div> */}
        <div className="prev-next-page d-flex flex-grow-1 justify-content-end">
          <div className="btn btn-group" role="group" aria-lable="example">
              <button type="button" className="btn btn-outline-secondary" value="previous" onClick={handlePagination}>Previous Page</button>
              <button type="button" className="btn btn-outline-secondary" value="next" onClick={handlePagination}>Next Page</button>
          </div>
        </div>
      </div>
  </div>
  )
}
