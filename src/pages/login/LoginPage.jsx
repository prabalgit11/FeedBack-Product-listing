import { React, useContext, useState } from 'react'
import './LoginPage.css'
import { clientSideValidation } from './../../actions/Helper';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { getUserLoggedIn } from '../../actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


const LoginPage = () => {

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const { setUserLoggedIn } = useContext(UserContext);
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
        const userToBeLoggedIn = {
            name: '0000000',
            email: userDetails.email,
            mobile: '0000000000',
            password: userDetails.password
        }
        const result = clientSideValidation(userToBeLoggedIn);
        if (result.success) {

            const userLogIn = await getUserLoggedIn(userToBeLoggedIn);

            if (userLogIn.success) {
                toast.success(userLogIn.message);
                setUserLoggedIn(true);
                navigate('/');
            }
            else {
                toast.error(userLogIn.message);
            }

        }
        else {
            setErrors(result.errors);
        }
    }

    const handleSignUp = () => {
        navigate('/signUp');
    }

    return (
        <div className='login-main'>
            <h1 className='app-feedback'>Feedback</h1>
            <h3 className='app-info'>Add your products and give us your valuable feedback</h3>
            <div className='login-filed'>
                <div className='email-filed'>
                    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.5rem' }} />
                    <input placeholder='Email' className='login-email' name='email' onChange={handleChange}></input>
                </div>
                {errors.email && <span className='error'>{errors.email}</span>}
                <div className='password-filed'>
                    <FontAwesomeIcon icon={faLock} style={{ fontSize: '1.5rem' }} />
                    <input type="password" placeholder='Password' className='login-password' name='password' onChange={handleChange} />
                </div>
                {errors.password && <span className='error'>{errors.password}</span>}
                <span className='signup' >Don't have an account? <span className='signup-buttn' onClick={handleSignUp}>Sign up</span></span>
                <div className='login'>
                    <span className='login-buttn' onClick={handleSubmit}>Login</span>
                </div>
            </div>
        </div>
    )
}
export default LoginPage