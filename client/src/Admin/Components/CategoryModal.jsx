import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { storage } from '../utils/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { AppRoute } from '../../App';
function CategoryModal() {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categoryName, setCategoryName] = useState("")
    const [categoryImage, setCategoryImage] = useState(null)
    const AddCategory = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `images/category/${categoryImage.name}`);
        uploadBytes(storageRef, categoryImage).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = {
                        categoryName,
                        categoryImage: url
                    }
                    axios.post('/api/category', payload)
                        .then((json) => {
                            setShow(false);


                            setCategory(json.data.categories);


                        })
                        .catch(err => alert(err.message))
                })
                .catch((error) => console.log(error));
        });

    }

    return (
        <>
            <button className='btn btn-outline-warning' onClick={handleShow}>Add Category</button>

            <Modal show={show} onHide={handleClose} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={AddCategory}>
                        <div className="form-group">
                            <label htmlFor="CategoryName">Category Name</label>
                            <input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                placeholder="Enter your category name"
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                                Category Image
                            </label>
                            <input className="form-control" type="file" id="formFile" onChange={(e) => setCategoryImage(e.target.files[0])} />
                        </div>

                        <button type="submit" className="btn btn-outline-warning mt-4" onClick={handleClose}>
                            Submit
                        </button>
                    </form>

                </Modal.Body>

            </Modal>
        </>
    );
}

export default CategoryModal;