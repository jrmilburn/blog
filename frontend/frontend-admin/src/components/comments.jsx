import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './styles/comments.module.css';

export default function Comments() {
    
    const { postid } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postid}/comments`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(comments => {
                setComments(comments);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [postid, comments]);

    const handleChange = (e) => {

        setNewComment(e.target.value);

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:3000/posts/${postid}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: newComment,
            })});

            if(!response.ok) {
                throw new Error('Network response not ok');
            }

        } catch (err) {
            setError(err);
        }

        setNewComment('');

    }

    if (loading) return (
        <div >
            Loading...
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    return(
        <div className={styles["comments"]}>
            {comments.comments.map(comment => {
                    return (
                        <div key={comment.id} className={styles["content"]}>
                            <h3>{comment.post.title}, {comment.author.email}</h3>
                            <p>{comment.content}</p>
                            <p>{comment.createdAt}</p>
                        </div>
                    );
                })}

            <div className={styles["add-comment"]}>
                <form onSubmit={handleSubmit}>

                    <div>
                        <textarea name="comment" id="comment" rows={3} cols={50} onChange={handleChange}></textarea>
                    </div>
                    <button type='submit'>Post</button>

                </form>
            </div>
        </div>
    )

}