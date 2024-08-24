import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './styles/comments.module.css';

import Comment from './comment';

export default function Comments() {
    
    const { postid } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`https://blog-api-top.adaptable.app/posts/${postid}/comments`)
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

            const response = await fetch(`https://blog-api-top.adaptable.app/posts/${postid}/comments`, {
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

            setNewComment('');

        } catch (err) {
            setError(err);
        }

    }

    const handleUpdate = async (commentid, newContent) => {

        try {

            const response = await fetch(`https://blog-api-top.adaptable.app/posts/${postid}/comments/${commentid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: newContent,
            })});

            if(!response.ok) {
                throw new Error('Network response not ok');
            }

        } catch (err) {
            setError(err);
        }

    }

    const handleDelete = async (commentid) => {

        try {

            const response = await fetch(`https://blog-api-top.adaptable.app/posts/${postid}/comments/${commentid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});

            if(!response.ok) {
                throw new Error('Network response not ok');
            }

        } catch (err) {
            setError(err);
        }

    }

    if (loading) return (
        <div >
            Loading...
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    return(
        <div className={styles["comments"]}>
            {comments.comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))  // Sort by createdAt date descending
            .map(comment => {
                return (
                    <Comment 
                        key={comment.id}
                        title={comment.post.title}
                        content={comment.content}
                        author={comment.author.email}
                        created={comment.createdAt}
                        onDelete={() => handleDelete(comment.id)}
                        onUpdate={(newContent) => handleUpdate(comment.id, newContent)}
                    />
                );
            })}

            <div className={styles["add-comment"]}>
                <form onSubmit={handleSubmit}>

                    <div>
                        <textarea name="comment" id="comment" rows={3} cols={50} onChange={handleChange} value={newComment}></textarea>
                    </div>
                    <button type='submit'>Post</button>

                </form>
            </div>
        </div>
    )

}