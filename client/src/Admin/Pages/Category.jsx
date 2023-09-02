import React, { useEffect, useState } from 'react'
import CategoryModal from '../Components/CategoryModal'
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai'
import CategoryUpdateModal from '../Components/CategoryUpdateModal';
// import { AppRoute } from '../../App';

function Category() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get('/api/all-categories')
      .then((json) => {
        setCategory(json.data.category)
        setLoading(false)
      })
      .catch(err => console.log(err.messsage))
  }, [])

  const deleteProduct = (_id) => {
    axios.delete(`/api/category/${_id}`,)
      .then(json => {
        console.log(json.data);
        setCategory(category.filter(cat => cat._id !== _id));
      })
      .catch(err => console.log(err.message))
  }

  if (loading) {
    return <div className='d-flex justify-content-center align-items-center' style={{ width: '80vw', height: '80vh' }}>
      <span className="loader"></span>
    </div>
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center p-2 my-3 rounded " style={{ color: '#9e9ea4', backgroundColor: '#1d2634' }}>
        <span className='fs-4 fw-bold'>Categories</span>
        <CategoryModal setCategory={setCategory} />
      </div>
      <div className="container" >
        <div className="d-flex justify-content-between align-items-center p-2 my-3 rounded " style={{ color: '#9e9ea4', backgroundColor: '#1d2634' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Category Image</th>
                <th scope='col'> Edit</th>
              </tr>
            </thead>

            <tbody >
              {
                category?.map((val) =>

                  <tr key={val._id} style={{ color: '#9e9ea4', backgroundColor: '#1d2634' }}>
                    <th scope="row">{val._id}</th>
                    <td >{val.categoryName}</td>


                    <td><img src={val.categoryImage} alt="" className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} /></td>

                    <td>
                      <CategoryUpdateModal ID={val._id} recallData={setCategory} />

                      <button className="btn btn-dark mx-1" onClick={() => deleteProduct(val._id)}><AiFillDelete /></button>
                    </td>
                  </tr>

                )
              }


            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Category