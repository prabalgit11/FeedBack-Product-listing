import { useContext, useState } from 'react';
import './SignUpPopup.css'
import { clientSideValidation } from './../../actions/Helper';
import { UserContext } from '../../App';
import { getUserRegistered } from '../../actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faMobileScreen } from '@fortawesome/free-solid-svg-icons'


const SignUp = () => {

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const { setModalToShow } = useContext(UserContext);

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
                setModalToShow('AddProducts');
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
        setModalToShow('LogIn');
    }

    return (


        <div className='signupPopup-filed'>
            <span className='signup-heading'>Signup to continue</span>
            <div className='Popup-name2'>
                <FontAwesomeIcon icon={faUser} className='signup-icon' />
                <input placeholder='Name' className='name-input1' name='name' onChange={handleChange} ></input>
            </div>
            {errors.name && <span className='error'>{errors.name}</span>}

            <div className='Popup-email2'>
                <FontAwesomeIcon icon={faEnvelope} className='signup-icon' />
                <input placeholder='Email' className='email-input1' name='email' onChange={handleChange} ></input>
            </div>
            {errors.email && <span className='error'>{errors.email}</span>}

            <div className='Popup-mobile2'>
                <FontAwesomeIcon icon={faMobileScreen} className='signup-icon' />
                <input type='Number' placeholder='Mobile' className='mobile-input1' name='mobile' onChange={handleChange} ></input>
            </div>
            {errors.mobile && <span className='error'>{errors.mobile}</span>}

            <div className='Popup-password2'>
                <FontAwesomeIcon icon={faLock} className='signup-icon' />
                <input type="password" placeholder='Password' className='password-input1' name='password' onChange={handleChange} />
            </div>
            {errors.password && <span className='error'>{errors.password}</span>}

            <span className='login2'>Already have an account? <span className='sign-text' onClick={handleLogin} >Login</span></span>

            <div className='signup2'>
                <span className='Popup-signup-button' onClick={handleSubmit} >Signup</span>
            </div>
        </div>

    )
}
export default SignUp