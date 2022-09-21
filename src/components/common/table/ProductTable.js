import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteProduct, getAllProduct, sendProductEmail } from "../../../feature/product/productThunk";



export default function ProductTable(props) {

  const dispatch = useDispatch()
  const { products, columns, handleDelete, handleUpdate } = props;
  const navigate = useNavigate()

  const mySwal = withReactContent(Swal)
  const handleDeleteProduct  = (id) => {
    handleDelete(id)
  }

  const handleUpdateProduct = (product) => {
    handleUpdate(product)
  }


  const handleProductMailSend = (product) => {
    Swal.fire({
      title: 'Do you want to Send Email',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      if(result.isConfirmed) {
          dispatch(sendProductEmail(product))
          Swal.fire('Success', '', 'success')    
      } else if(result.isDenied) {
        Swal.fire('Operation Canceled', '', 'info')
      }
    })
  }

  return (
    <div className="table-container mt-3">
      {/* <div className="page-top-container p-1"><span className="fw-bold">1-10 {products.length} Items</span></div> */}
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
          {products &&
            products.map((product, index) => (
              <tr scope="row"  className={`user-table-row`}>
                <td>{product.stock_number}</td>
                <td>{product.category}</td>
                <td>
                <button
                  className={`fw-bold btn btn-block subs-button ${
                    product.inStock === true
                      ? "bg-color-green"
                      : "bg-color-red "
                  } color-white custom-button-medium`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </button>
                </td>
                <td>
                  <img
                    src={`http://d1n2t-adm1n.maxnetcommercial.com:8080/${product.files[0]}`}
                    height="50px"
                    width="50px"
                    className="border"
                    alt="..."
                  />
                  {/* <div
                    style={{"backgroundImage": `url(${product.files[0]})`, }}
                    className="border"
                  ></div> */}
                </td>
                <td className="table-icon-group">
                  <i className="fa-solid fa-pen cursor-pointer" onClick={(e) => navigate(`/product/update/${product._id}`, {state: product})}></i>
                  <i className={` fa-solid ${product.inStock === true ? "fa-toggle-off" : "fa-toggle-on"} cursor-pointer`} onClick={() => handleUpdateProduct(product)}></i>
                  <i className="fa-solid fa-trash-alt cursor-pointer color-red" onClick={() => handleDeleteProduct(product._id)}></i>
                  <i className="fa-solid fa-envelope cursor-pointer" onClick={() => handleProductMailSend(product)}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="page-bottom-container d-flex flex-row align-items-center">
        {/* <div className="item-per-page">
            <span className="fw-bold">Item Per Page : </span>
            <select className="page-select">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
        </div> */}
        <div className="prev-next-page d-flex flex-grow-1 justify-content-end">
          <div className="btn btn-group" role="group" aria-lable="example">
              <button type="button" className="btn btn-outline-secondary">Previous Page</button>
              <button type="button" className="btn btn-outline-secondary">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}
