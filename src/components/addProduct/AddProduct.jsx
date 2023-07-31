import { useContext, useState } from 'react'
import './AddProduct.css'
import { UserContext } from '../../App'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct } from '../../actions/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = (props) => {

    const [productDetails, setProductDetails] = useState({
        name: '',
        category: '',
        logoUrl: '',
        productLink: '',
        productDescription: ''
    })
    const { setShowModal, setUpdateAvailable, setFilterUpdateAvailable } = useContext(UserContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProductDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async () => {
        const { name, category, logoUrl, productDescription, productLink } = productDetails;
        if (!name || !category || !logoUrl || !productDescription || !productLink) {
            toast.error('All fields required', { autoclose: 3000 });

        }
        else {
            let result = '';
            if (props.edit) {
                result = await addProduct(productDetails);
            }


            if (result.success) {
                toast.success(result.message);
                setShowModal(false);
                navigate('/');
                setUpdateAvailable(true);
                setFilterUpdateAvailable(true);

            }
            else {
                toast.error(result.message);

            }
        }


    }
    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <div className='addProduct-main'>
            <span className='addProduct-heading'>
                Add your product
            </span>
            <input value={productDetails.name} type="text" placeholder='Name of the company' name='name' className='addProduct-input1' onChange={handleChange} />
            <input value={productDetails.category} type="text" placeholder='Category' name='category' className='addProduct-input1' onChange={handleChange} />
            <input value={productDetails.logoUrl} type="text" placeholder='Add logo url' name='logoUrl' className='addProduct-input1' onChange={handleChange} />
            <input value={productDetails.productLink} type="text" placeholder='Link of product' name='productLink' className='addProduct-input1' onChange={handleChange} />
            <input value={productDetails.productDescription} type="text" placeholder='Description of product' name='productDescription' className='addProduct-input1' onChange={handleChange} />
            <div className='addProduct-input1'>
                <span className='addProduct-button1' onClick={handleCancel}>Cancel</span>
                <span className='addProduct-button1' onClick={handleSubmit}>+Add</span>
            </div>
        </div>
    )
}

export default AddProduct
