import AddProduct from '../addProduct/AddProduct'
import Login from '../login/LoginPopup'
import SignUp from '../signup/SignUpPopup'
import styles from './Modal.module.css'
export default
    function Modal(props) {
    return (
        <div className={styles.main}>
            <div className={styles.newModal}>
                <div className={styles.left}>
                    {props.show === 'LogIn' && <Login />}
                    {props.show === 'SignUp' && <SignUp />}
                    {props.show === 'AddProducts' && <AddProduct edit={false} />}
                </div>
                <div className={styles.right}>
                    <span className={styles.text1}>Feedback</span>
                    <span className={styles.text2}>Add your product and rate other items...</span>
                </div>
            </div>
        </div>
    )
}
