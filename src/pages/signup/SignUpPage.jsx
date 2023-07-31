import { useState, React } from 'react';
import './SignUpPage.css'
import { clientSideValidation } from './../../actions/Helper';
import { useNavigate } from 'react-router-dom';
import { getUserRegistered } from '../../actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faMobileScreen } from '@fortawesome/free-solid-svg-icons'

const SignUpPage = () => {

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserDetails((prevDetails) => {
            return {
                ...prevDetails,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async () => {
        const userToBeValidated = {
            name: userDetails.name,
            email: userDetails.email,
            mobile: userDetails.mobile,
            password: userDetails.password
        }
        const result = clientSideValidation(userToBeValidated);
        if (result.success) {
            const userRegistration = await getUserRegistered(userToBeValidated);

            if (userRegistration.success) {
                toast.success(userRegistration.message, { autoClose: 3000 });
                navigate('/login');
            }
            else {
                toast.error(userRegistration.message, { autoClose: 3000 });
            }
        }
        else {
            setErrors(result.errors);
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='signup-main'>

            <h1 className='app-feedback2'>Feedback</h1>
            <h3 className='app-info2'>Add your products and give us your valuable feedback</h3>

            <div className='signup-section'>

                <div className='name1'>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5rem' }} />
                    <input placeholder='Name' className='detail-filed' name='name' onChange={handleChange} ></input>
                </div>
                {errors.name && <span className='error'>{errors.name}</span>}

                <div className='email1'>
                    < FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.5rem' }} />
                    <input placeholder='Email' className='detail-filed' name='email' onChange={handleChange} ></input>
                </div>
                {errors.email && <span className='error'>{errors.email}</span>}

                <div className='mobile1'>
                    < FontAwesomeIcon icon={faMobileScreen} style={{ fontSize: '1.5rem' }} />
                    <input type='Number' placeholder='Mobile' className='detail-filed' name='mobile' onChange={handleChange} ></input>
                </div>
                {errors.mobile && <span className='error'>{errors.mobile}</span>}

                <div className='password1'>
                    <FontAwesomeIcon icon={faLock} style={{ fontSize: '1.5rem' }} />
                    <input type="password" placeholder='Password' className='detail-filed' name='password' onChange={handleChange} />
                </div>
                {errors.password && <span className='error'>{errors.password}</span>}

                <span className='login-text'>Already have an account? <span className='login1' onClick={handleLogin} >Login</span></span>

                <div className='singup'>
                    <span className='signup-button' onClick={handleSubmit} >Signup</span>
                </div>
            </div>
        </div>
    )
}
export default SignUpPage
