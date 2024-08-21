import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles/post.module.css';
import formatDate from './formatDate';

export default function Post() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
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
    }, [id]);

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


        </div>
    )

}

