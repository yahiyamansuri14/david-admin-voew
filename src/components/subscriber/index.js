import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, updateUser, searchUser, deleteUser } from '../../feature/product/productThunk'
import Filter from '../common/filter'
import SubscriberTable from '../common/table/SubscriberTable'
import AddSubscriber from '../email/AddSubscriber'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function Subscriber() {

    const mySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const users = useSelector((state) => state.product.users)
    const columns = [ 'Email', 'Status', 'Actions']
    useEffect(() => {
        console.log("first time rendered")
        dispatch(getAllUser())
    }, [])

    const handleUpdate = (data) => {
        let { _id, isActive, isAdmin, email, isSubscriber, password } = data
        let temp_data = {_id, isActive, isAdmin, email, isSubscriber, password}
        temp_data.isActive = !(Boolean(temp_data.isActive))
        Swal.fire({
            title: 'Do you want to Perform Action',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`
          }).then((result) => {
            if(result.isConfirmed) {
              dispatch(updateUser(temp_data))
              dispatch(getAllUser() )
                Swal.fire('Success', '', 'success')    
            } else if(result.isDenied) {
              Swal.fire('Operation Canceled', '', 'info')
            }
          })
    }

    const handleDeleteUser = (data) => {
        Swal.fire({
            title: 'Do you want to Perform Action',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`
          }).then((result) => {
            if(result.isConfirmed) {
              dispatch(deleteUser(data))
              dispatch(getAllUser())
                Swal.fire('Success', '', 'success')     
            } else if(result.isDenied) {
              Swal.fire('Operation Canceled', '', 'info')
            }
          })
    }

    const filters = [
        {
            field: 'otherField',
            lable: 'keyword',
            inputConfig: {
                element: "input",
                type: "text",
                placeholder: "Enter email"
            }
        }
    ]

    const handleFilter = (text) => {
        dispatch(searchUser(text))
    }

    const handlePagination = (data) => {
        // console.log("data in handle pagination is", data)
        dispatch(getAllUser(data))
    }

  return (
    <>
        <div className='subscriber-page'>
            <div className='row m-0 p-0'>
                <div className='col-md-12 col-sm-12 col-xl-6 p-2'>
                    <AddSubscriber />
                </div>
                <div className='col-md-12 col-sm-12 col-xl-6 p-2'>
                    <Filter 
                        filters={filters}
                        handleFilter={handleFilter}
                    />
                </div>
            </div>
            <div className='row m-0 p-0'>
                <div className='col-sm-12 col-md-12 col-xl-12'>
                    <SubscriberTable 
                        users={users}
                        columns={columns} 
                        handleUpdate={handleUpdate} 
                        handlePagination={handlePagination}
                        handleDeleteUser={handleDeleteUser}
                    />
                </div>
            </div>
        </div>
    </>
  )
}
