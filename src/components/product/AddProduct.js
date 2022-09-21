import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, uploadImage } from "../../feature/product/productThunk";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { emptyFiles } from "../../feature/product/productSlice";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const mySwal = withReactContent(Swal)
  const { files } = useSelector((state) => state.product)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product_state, setProductState] = useState({
    category: '',
    stock_number: '',
    header: '',
    value: '',
    subject: '',
    description: '',
    extra_field: [
      { field_heading: '', field_value: '' },

    ],
    file1: '',
    file2: '',
    file3: ''
  })


  // category: 'category 101 updated',
  // stock_number: '#ship123 udpated',
  // header: 'header 101 updated',
  // value: 'value 101 up[date',
  // subject: 'subject 101 updated',
  // description: 'description 101 updated',
  // extra_field: [
  //   { field_heading: 'heading1', field_value: 'value1' },
  //   { field_heading: 'heading2', field_value: 'value2' },
  // ],
  // file1: '',
  // file2: '',
  // file3: ''



  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('category', product_state.category)
    formData.append('stock_number', product_state.stock_number)
    formData.append('header', product_state.header)
    formData.append('value', product_state.value)
    formData.append('subject', product_state.subject)
    formData.append('description', product_state.description)
    formData.append('extra_field', JSON.stringify(product_state.extra_field))
    formData.append('files', files)
    Swal.fire({
      title: 'Do you want to Add product',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No, Don't`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(addProduct(formData))
        Swal.fire('Product Saved Successfully', '', 'success')
       navigate('/product/all')
      } else if (result.isDenied) {
        Swal.fire('Operation Canceled', '', 'info')
      }
    })

  }


  const handleServiceAdd = () => {
    setProductState({ ...product_state, extra_field: [...product_state.extra_field, { field_heading: '', field_value: '' }] })
  }

  const handleServiceRemove = (index) => {
    const list = [...product_state.extra_field]
    list.splice(index, 1)
    setProductState({ ...product_state, extra_field: list })
  }

  const handleChangeEvent = (e) => {
    setProductState({ ...product_state, [e.target.name]: e.target.value })
  }

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target
    const list = [...product_state.extra_field]
    list[index][name] = value
    setProductState({ ...product_state, extra_field: list })
  }


  const handleResetForm = () => {
    document.getElementById("add-product-form").reset();
    dispatch(emptyFiles())
  }

  return (
    <>
      <div className="product-container">
        <div className="product-detail-container">
          <form novalidate onSubmit={handleSubmit} id="add-product-form" >
            <div className="row m-0 p-0">
              <div className="col-md-3 col-xl-3 col-sm-12">
                <label className="form-label font-size-16">Stock</label>
                <input type="text" className="form-control" name="stock_number" onChange={handleChangeEvent} value={product_state.stock_number} required placeholder="#stock"/>
              </div>
              <div className="col-md-3 col-xl-3 col-sm-12">
                <label className="form-label font-size-16">Category</label>
                <input type="text" className="form-control" name="category" onChange={handleChangeEvent} value={product_state.category} required placeholder="category"/>
              </div>
              <div className="col-md-3 col-xl-3 col-sm-12">
                <label className="form-label font-size-16">Subject(for email)</label>
                <input type="text" className="form-control" name="subject" onChange={handleChangeEvent} value={product_state.subject} required placeholder="subject"/>
              </div>
            </div>
            <div className="row m-0 p-0">
              {/* <div className="col-md-3 col-xl-3 col-sm-12">
                <label className="form-label font-size-16">Header</label>
                <input type="text" className="form-control" name="header" onChange={handleChangeEvent} value={product_state.header} required/>
              </div>
              <div className="col-md-3 col-xl-3 col-sm-12">
                <label className="form-label font-size-16">Value</label>
                <input type="text" className="form-control" name="value" onChange={handleChangeEvent} value={product_state.value} required/>
              </div> */}
              {
                product_state.extra_field.map((field, index) => (
                  <div className="row m-0 p-0" key={index}>
                    <div className="col-md-3 col-sm-3 col-xl-3">
                      <label className="form-label font-size-16">Field Heading</label>
                      <input type="text" className="form-control" name="field_heading" value={product_state.extra_field.field_heading} onChange={(e) => handleFieldChange(e, index)} placeholder="heading"/>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xl-3">
                      <label className="form-label font-size-16">Field Value</label>
                      <input type="text" className="form-control" name="field_value" value={product_state.extra_field.field_value} onChange={(e) => handleFieldChange(e, index)} placeholder="value"/>
                    </div>
                    {
                      product_state.extra_field.length !== 1 && (
                        <div className="col-md-3 col-xl-3 col-sm-12">
                          <label className="form-label font-size-16">Action</label>
                          <br></br>
                          <button className="btn btn-danger btn-block" onClick={handleServiceRemove}>Remove - </button>
                        </div>
                      )
                    }

                    {
                      product_state.extra_field.length - 1 === index && (
                        <div className="row m-0 p-0">
                          <div className="col-md-3 col-xl-3 col-sm-12">
                            {/* <label className="form-label font-size-16">Action</label> */}
                            <br></br>
                            <button className="btn btn-primary btn-block" onClick={handleServiceAdd}>Add More + </button>
                          </div>
                        </div>
                      )
                    }


                  </div>
                ))
              }


            </div>
            <div className="row m-0 p-0">
              <div className="col-sm-12 col-md-6 col-xl-6">
                <label className="form-label font-size-16">Description</label>
                <br></br>
                <textarea className="form-control" name="description" onChange={handleChangeEvent} value={product_state.description} required placeholder="Description"></textarea>
              </div>
            </div>
            <div className="row m-0 p-0">
              <div className="col-sm-12 col-md-3 col-xl-3">
                <label className="form-label font-size-16">File 1</label>
                <input
                  type="file"
                  className="form-control"
                  // onChange={(e) => setProductState({ ...product_state, file1: e.target.files[0] })}
                  // onChange={(e) => console.log(e.target.files[0])}
                  onChange={(e) => dispatch(uploadImage(e.target.files[0]))}
                  required
                />
              </div>
              <div className="col-sm-12 col-md-3 col-xl-3">
                <label className="form-label font-size-16">File 2</label>
                <input
                  type="file"
                  className="form-control"
                  // onChange={(e) => setProductState({ ...product_state, file2: e.target.files[0] })}
                  onChange={(e) => dispatch(uploadImage(e.target.files[0]))}
                  required
                />
              </div>
              <div className="col-sm-12 col-md-3 col-xl-3">
                <label className="form-label font-size-16">File 3</label>
                <input
                  type="file"
                  className="form-control"
                  // onChange={(e) => setProductState({ ...product_state, file3: e.target.files[0] })}
                  //onClick={handleSubmit}
                  onChange={(e) => dispatch(uploadImage(e.target.files[0]))}
                  required
                />
              </div>
            </div>
            <div className="row m-0 p-0">
              <div className="col-sm-12 col-md-5 col-xl-5 mt-3 gap-1">
                <button className="btn btn-primary btn-block w-100" type="submit" >Add</button>
              </div>
              <div className="col-sm-12 col-md-5 col-xl-5 mt-3">
                <button className="btn btn-secondary btn-block w-100" type="button" onClick={handleResetForm}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
