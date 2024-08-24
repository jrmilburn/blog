import { useState, useEffect } from 'react';
import styles from './styles/comments.module.css';

import formatDate from './formatDate';

export default function Comments({ postId }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://blog-api-top.adaptable.app/posts/${postId}/comments`)
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
    }, [postId]);

    if (loading) return (
        <div >
            Loading...
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    if (data && data.comments.length > 0) {
        return (
            <div className={styles["comments"]}>
                {data.comments.map(comment => {
                    return (
                        <div key={comment.id} className={styles["content"]}>
                            <h3>{comment.author.name}</h3>
                            <p>{formatDate(comment.createdAt)}</p>
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (  // Add return here
            <div className={styles["comments"]}>
                <strong>No comments on this post</strong>
            </div>
        );
    }
    



}