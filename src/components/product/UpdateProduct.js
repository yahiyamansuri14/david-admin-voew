import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addProduct, updateProduct, uploadImage } from "../../feature/product/productThunk";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function UpdateProduct(props) {
    const { files } = useSelector((state) => state.product)
    const { state } = useLocation()
    const dispatch = useDispatch()
    const mySwal = withReactContent(Swal)
    const [product_state, setProductState] = useState({
        category: state.category,
        stock_number: state.stock_number,
        header: state.header,
        value: state.value,
        subject: state.subject,
        description: state.description,
        extra_field: state.extra_field,
        file1: "",
        file2: "",
        file3: "",
        images: []
    })


    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('category', product_state.category)
        formData.append('stock_number', product_state.stock_number)
        formData.append('header', product_state.header)
        formData.append('value', product_state.value)
        formData.append('subject', product_state.subject)
        formData.append('description', product_state.description)
        formData.append('extra_field', JSON.stringify(product_state.extra_field))
        formData.append('inStock', product_state.inStock)
        if (files.length > 0) {
            console.log("inside 1")
            formData.append('files', files)
        } else {
            console.log("inside 2")
            formData.append('files', state.files)
        }

        formData.append('_id', state._id)
        Swal.fire({
            title: 'Do you want to Update product',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No, Don't Send`
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateProduct(formData))
                Swal.fire('Product Updated Successfully', '', 'success')
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




    return (
        <>
            <div className="product-container">
                <div className="product-detail-container">
                    <div className="row m-0 p-0">
                        <div className="col-md-3 col-xl-3 col-sm-12">
                            <label className="form-label font-size-16">Stock</label>
                            <input type="text" className="form-control" name="stock_number" onChange={handleChangeEvent} value={product_state.stock_number} />
                        </div>
                        <div className="col-md-3 col-xl-3 col-sm-12">
                            <label className="form-label font-size-16">Category</label>
                            <input type="text" className="form-control" name="category" onChange={handleChangeEvent} value={product_state.category} />
                        </div>
                        <div className="col-md-3 col-xl-3 col-sm-12">
                            <label className="form-label font-size-16">Subject(for email)</label>
                            <input type="text" className="form-control" name="subject" onChange={handleChangeEvent} value={product_state.subject} />
                        </div>
                    </div>
                    <div className="row m-0 p-0">
                        {/* <div className="col-md-3 col-xl-3 col-sm-12">
                            <label className="form-label font-size-16">Header</label>
                            <input type="text" className="form-control" name="header" onChange={handleChangeEvent} value={product_state.header} />
                        </div>
                        <div className="col-md-3 col-xl-3 col-sm-12">
                            <label className="form-label font-size-16">Value</label>
                            <input type="text" className="form-control" name="value" onChange={handleChangeEvent} value={product_state.value} />
                        </div> */}
                        {
                            product_state.extra_field.map((field, index) => (
                                <div className="row m-0 p-0" key={index}>
                                    <div className="col-md-3 col-sm-3 col-xl-3">
                                        <label className="form-label font-size-16">Field Heading</label>
                                        <input type="text" className="form-control" name="field_heading" value={product_state.extra_field[index].field_heading} onChange={(e) => handleFieldChange(e, index)} />
                                    </div>
                                    <div className="col-md-3 col-sm-3 col-xl-3">
                                        <label className="form-label font-size-16">Field Value</label>
                                        <input type="text" className="form-control" name="field_value" value={product_state.extra_field[index].field_value} onChange={(e) => handleFieldChange(e, index)} />
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
                            <textarea className="form-control" name="description" onChange={handleChangeEvent} value={product_state.description}></textarea>
                        </div>
                    </div>
                    <div className="row m-0 p-0">
                        <div className="col-sm-12 col-md-3 col-xl-3">
                            <label className="form-label font-size-16">File 1</label>
                            <input
                                type="file"
                                className="form-control"
                                // onChange={(e) => setProductState({ ...product_state, file1: e.target.files[0] })}
                                onChange={(e) => dispatch(uploadImage(e.target.files[0]))}
                            />
                        </div>
                        <div className="col-sm-12 col-md-3 col-xl-3">
                            <label className="form-label font-size-16">File 2</label>
                            <input
                                type="file"
                                className="form-control"
                                // onChange={(e) => setProductState({ ...product_state, file2: e.target.files[0] })}
                                onChange={(e) => dispatch(uploadImage(e.target.files[0]))}
                            />
                        </div>
                        <div className="col-sm-12 col-md-3 col-xl-3">
                            <label className="form-label font-size-16">File 3</label>
                            <input
                                type="file"
                                className="form-control"
                                // onChange={(e) => setProductState({ ...product_state, file3: e.target.files[0] })}
                                onChange={(e) => dispatch(uploadImage(e.target.files[0]))}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 p-0 ">
                        <div className="d-flex flex-row images-container align-items-center">
                            {
                                state.files.map(file => (

                                    <img src={`http://139.144.62.230:8080/${file}`} alt=".." className="m-2 border" style={{ 'height': '200px', 'width': '200px' }} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="row m-0 p-0">
                        <div className="col-sm-12 col-md-5 col-xl-5 mt-3 gap-1">
                            <button className="btn btn-primary btn-block w-100" type="button" onClick={handleSubmit}>Update</button>
                        </div>
                        {/* <div className="col-sm-12 col-md-5 col-xl-5 mt-3">
                            <button className="btn btn-secondary btn-block w-100" type="button">Cancel</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
