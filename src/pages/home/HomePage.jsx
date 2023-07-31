
import { useContext, useEffect, useState, React } from 'react';
import { useNavigate } from "react-router-dom"
import FilterChip from '../../components/filterChip/FilterChip'
import Modal from '../../components/modal/Modal'
import ProductBox from '../../components/product/ProductBox'
import './HomePage.css'
import Banner from './../../assets/banner.png'
import { UserContext } from '../../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllFilters, getAllProducts } from '../../actions/api';


const HomePage = () => {

    const navigate = useNavigate();
    const { userLoggedIn, setUserLoggedIn, modalToShow, setModalToShow, showModal, setShowModal, filterSelected, sortBy, setSortBy, updateAvailable, setUpdateAvailable, filterUpdateAvailable, setFilterUpdateAvailable } = useContext(UserContext);
    const [productDisplay, setProductDisplay] = useState([]);
    const [tagDisplay, setTagDisplay] = useState([]);
    const [displaySortOptions, setDisplaySortOptions] = useState();
    const [displaySelect, setDisplaySelect] = useState('Select');
    const [productCount, setProductCount] = useState();

    useEffect(() => {
        setDisplaySortOptions(false);
    }, [])
    const getProductsAndDisplay = async () => {
        let query = '';
        if (sortBy && sortBy !== 'Select') {
            query += 'sort='
            query += sortBy;
        }
        if (filterSelected && filterSelected !== 'All') {
            if (query) {
                query += '&';
            }
            query += 'product_category='
            query += filterSelected;
        }
        const result = await getAllProducts(query);
        if (result.success) {
            const tempDisplay = result.data.map((item) => {
                return (
                    <ProductBox
                        id={item._id}
                        name={item.product_name}
                        logo={item.logo_url}
                        tags={item.product_category}
                        comments={item.comments}
                        comments_count={item.total_comments}
                        likes={item.likes}
                        description={item.product_description}
                    />
                )
            })
            setProductDisplay(tempDisplay);
            setUpdateAvailable(false);
            setProductCount(tempDisplay.length);
        }
        else {
            toast.error('Error in getting products, please retry!', { autoClose: 3000 });
        }
    }
    useEffect(() => {
        getProductsAndDisplay();

    }, [])
    const getFiltersAndDisplay = async () => {
        const result = await getAllFilters();
        if (result.success) {
            const tempDisplay = result.data.map((item) => {
                let isSelected = false;

                if (item == filterSelected) {
                    isSelected = true;
                }

                return (
                    <FilterChip
                        name={item}
                        isSelected={isSelected}
                    />
                )
            })

            setTagDisplay(tempDisplay);
            setFilterUpdateAvailable(false);
        }
        else {
            toast.error('Error in getting filters', { autoClose: 3000 });
        }
    }
    useEffect(() => {

        getFiltersAndDisplay();
    }, [filterSelected])

    useEffect(() => {
        if (updateAvailable) {
            setProductDisplay('');
            getProductsAndDisplay();
        }
    }, [updateAvailable])

    useEffect(() => {
        if (filterUpdateAvailable) {
            getFiltersAndDisplay();
        }
    }, [filterUpdateAvailable])

    const handleLoginLogout = () => {
        if (userLoggedIn) {
            setUserLoggedIn(false);
            toast.success('User Logged out!');
            localStorage.removeItem('feedbackUser');
        }
        else {
            navigate('login');
        }
    }

    const handleAddProducts = () => {
        if (userLoggedIn) {
            setModalToShow('AddProducts');
        }
        else {
            setModalToShow('LogIn');
        }
        setShowModal(true);
    }

    const handleFilter = (filter) => {
        setDisplaySortOptions(displaySortOptions ? false : true)
        if (filter == 'Comments') {
            if (sortBy == 'comments') {
                setSortBy('');
                setDisplaySelect('Select');
            }
            else {
                setSortBy('comments');
                setDisplaySelect(filter);

            }
            setUpdateAvailable(true);

        }
        else if (filter == 'Upvotes') {
            if (sortBy == 'likes') {
                setDisplaySelect('Select');
                setSortBy('');
            }
            else {
                setSortBy('likes');
                setDisplaySelect(filter);

            }
            setUpdateAvailable(true);

        }
    }
    const handleSignUp = () => {
        if (!userLoggedIn) {
            navigate('signUp')
        }
    }


    return (
        <>
            <div className='navbar'>
                <span className='navbar-heading'>Feedback</span>
                <div className='navbar-box'>
                    <span className='navbar-buttn' onClick={handleLoginLogout}>{userLoggedIn ? 'Logout' : 'Login'}</span>
                    <span className='navbar-buttn' onClick={handleSignUp}>{userLoggedIn ? `Hello ! ` : 'Sign up'}{userLoggedIn}</span>
                </div>
            </div>
            <div className='hero-section'>
                <div className='hero-left'>
                    <img src={Banner} className='banner'></img>
                </div>
                <div className='hero-right'>
                    <span className='app-feedback1'>Add your products and give your valuable feedback</span>
                    <span className='app-info1'>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</span>
                </div>
            </div>

            <div className='footer-section'>

                <div className='footer-left'>
                    <div className='filter'>
                        <span className='filter-info1'>Apply Filter</span>
                        <span className='filter-info2'>Feedback</span>
                    </div>
                    <div className='all-filter'>
                        {tagDisplay}
                    </div>
                </div>
                <div className='footer-right'>

                    <div className='suggestion-section'>
                        <div className='suggestion-box'>
                            <span className='suggestion'> {productCount} Suggestions</span>
                        </div>
                        <div className='sort-section'>
                            <div className='sorted-box'>
                                <span className='sorted' >Sort By: </span>
                            </div>

                            <div className='select-section'>
                                <span className='selected-box' onClick={() => handleFilter('Select')}>{displaySelect}</span>
                                {displaySortOptions && <span className='select' onClick={() => handleFilter('Upvotes')}>Upvotes</span>}
                                {displaySortOptions && <span className='select' onClick={() => handleFilter('Comments')}>Comment</span>}

                            </div>
                        </div>
                        <div className='add-product' onClick={handleAddProducts}>+ Add Products</div>
                    </div>

                    <div className='product-display'>
                        {productDisplay}
                    </div>
                </div>
            </div>
            {showModal && <Modal show={modalToShow} />}

        </>
    )
}
export default HomePage