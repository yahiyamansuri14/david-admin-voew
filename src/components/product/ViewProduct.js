import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProduct, updateProduct, updateStock } from '../../feature/product/productThunk'
import ProductTable from '../common/table/ProductTable'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ViewProduct() {
  const dispatch = useDispatch()
  const mySwal = withReactContent(Swal)
  const { products } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getAllProduct())
  }, [])

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Do you want to Perform Action',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      if(result.isConfirmed) {
        dispatch(deleteProduct(id))
        dispatch(getAllProduct())
          Swal.fire('Success', '', 'success')    
      } else if(result.isDenied) {
        Swal.fire('Operation Canceled', '', 'info')
      }
    })
  }

  const handleUpdateProduct = (product) => {
    // console.log(product)
    let {
      category, description, extra_field, files, header, inStock, stock_number, subject, value, _id
    } = product
    console.log("files are", files)
    inStock = !Boolean(inStock)
    extra_field = JSON.stringify(extra_field)
    let data = {
      _id, inStock
    }
    Swal.fire({
      title: 'Do you want to Perform Action',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      if(result.isConfirmed) {
        // dispatch(updateProduct(data))
        dispatch(updateStock(data))
        dispatch(getAllProduct())
          Swal.fire('Success', '', 'success')    
      } else if(result.isDenied) {
        Swal.fire('Operation Canceled', '', 'info')
      }
    })
  }

  const productList = [
    {'category': 'category-1', 'value': 'value1', 'status': "Active"},
    {'category': 'category-2', 'value': 'value2', 'status': "Deactive"},
    {'category': 'category-2', 'value': 'value2', 'status': "Deactive"},
    {'category': 'category-2', 'value': 'value2', 'status': "Active"},
    {'category': 'category-2', 'value': 'value2', 'status': "Active"},
    {'category': 'category-2', 'value': 'value2', 'status': "Active"}
  ]

  const columns = ['Stock Number', 'Category', 'Status', 'Image', 'Actions']

  return (
    <>
      <ProductTable 
        products={products}
        columns={columns}
        handleDelete={handleDeleteProduct}
        handleUpdate={handleUpdateProduct}
      />
    </>
  )
}
