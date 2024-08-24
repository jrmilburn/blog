import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles/post.module.css';
import formatDate from './formatDate';
import { useNavigate } from 'react-router-dom';

import Comments from './comments';

export default function Post() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');

    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://blog-api-top.adaptable.app/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, newComment]);

    const addComment = async () => {

        const resp = await fetch(`https://blog-api-top.adaptable.app/${id}/comments`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: newComment,
                })
        });

        if(!resp.ok) {
            throw new Error('Network response not ok');
        }

        setNewComment('');

        navigate(`/blog/${id}`);

    }

    if (loading) return (
        <div >
            Loading...
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles["post"]}>
            <div className={styles["title"]}>
                <h1>{data.post.title}</h1>
                <p><strong>Created: {formatDate(data.post.createdAt)}</strong></p>
                {data.post.updatedAt ? <p>Last update: {data.post.updatedAt}</p> : null}

            </div>

            <p>{data.post.content}</p>

            <Comments postId={id} />

            {token && (
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    addComment();
                }}>

                <input type="text" name='comment' placeholder='Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />

                <button type='submit'>Submit</button>

            </form>)}


        </div>
    )

}

