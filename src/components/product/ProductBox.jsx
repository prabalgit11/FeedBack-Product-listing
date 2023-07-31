import { useContext, useEffect, useState } from 'react'
import './ProductBox.css'
import { addComment, addLike } from '../../actions/api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faAngleUp, faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App';

const ProductBox = (props) => {

    const [displayChips, setDisplayChips] = useState();
    const [displayComments, setDisplayComments] = useState();
    const [showCommentBox, setShowCommentBox] = useState();
    const [comment, setComment] = useState('');
    const [likeCount, setLikeCount] = useState();
    const [commentCount, setCommentCount] = useState();
    const { userLoggedIn, setModalToShow, setShowModal, } = useContext(UserContext);



    useEffect(() => {
        const tempDisplayChips = props.tags.map((item) => {
            return (
                <span className='chipItems'>{item}</span>
            )
        })

        const tempDisplayComments = props.comments.map((item) => {
            return (
                <span className='comments'>{item}</span>
            )
        })

        setDisplayComments(tempDisplayComments);
        setDisplayChips(tempDisplayChips);
        setShowCommentBox(false);
        setLikeCount(props.likes);
        setCommentCount(props.comments_count);
    }, [])


    const handleCommentBox = () => {
        setShowCommentBox(showCommentBox ? false : true);
    }

    const writeComment = (e) => {
        setComment(() => {
            return e.target.value

        })
    }

    const handleComment = async () => {
        const result = await addComment({
            id: props.id,
            comment: comment
        })
        if (result.success) {
            setCommentCount(commentCount + 1);
            const newCommentsArray = displayComments.map(item => item)
            newCommentsArray.push(<span className='comments'>{comment}</span>)
            setDisplayComments(newCommentsArray);
        }
        else {
            toast.error(result.message)
        }
    }

    const handleLikes = async () => {
        const result = await addLike(props.id);
        if (result.success) {
            setLikeCount(likeCount + 1);
        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <>
            <div className='container'>
                <img src={props.logo} className='logo-image'></img>
                <div className='main-box'>
                    <span className='name'>{props.name}</span>
                    <span className='description'> {props.description}</span>
                    <div className='comment-section'>
                        {displayChips}
                        <FontAwesomeIcon icon={faCommentDots} onClick={handleCommentBox} className='icon1' />
                        <span className='comment' onClick={handleCommentBox}>Comment</span>

                    </div>
                </div>
                <div className='like-box'>
                    <div className='add-likes' onClick={handleLikes}>
                        <FontAwesomeIcon icon={faAngleUp} />
                        <span className='count-likes'>{likeCount}</span>
                    </div>
                    <div className='comment-box1'>
                        <span className='comment-count'>{commentCount}</span>
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                </div>

            </div>
            {showCommentBox && <div className='comment-showbox'>
                <div className='top'>
                    <input className='comment-box2' placeholder='Add a comment...' onChange={writeComment}></input>
                    <FontAwesomeIcon icon={faPaperPlane} className='icon2' onClick={handleComment} />
                </div>
                <div className='bottom'>
                    {displayComments}
                </div>
            </div>}
        </>
    )
}
export default ProductBox