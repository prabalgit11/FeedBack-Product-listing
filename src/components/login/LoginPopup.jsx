import { useContext, useState } from 'react';
import './LoginPopup.css'
import { clientSideValidation } from '../../actions/Helper';
import { getUserLoggedIn } from '../../actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'



const Login = () => {

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const { setUserLoggedIn, setModalToShow } = useContext(UserContext);


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
                toast.success(userLogIn.message, { autoClose: 3000 });
                setUserLoggedIn(true);
                setModalToShow('AddProducts');
            }
            else {
                toast.error(userLogIn.message, { autoClose: 3000 });
            }

        }
        else {
            setErrors(result.errors);
        }
    }

    const handleSignUp = () => {
        setModalToShow('SignUp');
    }

    return (

        <div className='loginPopup-filed'>
            <span className='login-heading'>Log in to continue</span>
            <div className='Popup-email1'>
                < FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.5rem' }} />
                <input placeholder='Email' className='Popup-input' name='email' onChange={handleChange}></input>
            </div>
            {errors.email && <span className='error'>{errors.email}</span>}
            <div className='Popup-password1'>
                <FontAwesomeIcon icon={faLock} style={{ fontSize: '1.5rem' }} />
                <input type="password" placeholder='Password' className='Popup-input' name='password' onChange={handleChange} />
            </div>
            {errors.password && <span className='error'>{errors.password}</span>}
            <span className='signup1'>Don't have an account? <span className='signup-button1' onClick={handleSignUp}>Sign up?</span></span>
            <div className='login1'>
                <span className='login-button1' onClick={handleSubmit}>Login</span>
            </div>
        </div>


    )
}
export default Login