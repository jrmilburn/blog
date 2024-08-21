import { useState, useEffect } from 'react';
import styles from './styles/posts.module.css';
import AnimatedPage from './AnimatedPage';
import { Link } from 'react-router-dom';
import formatDate from './formatDate';


export default function Posts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/posts')
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
    }, []);

    if (loading) return (
        <div className={styles["loading"]}>
            Loading...
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    console.log(data);

    return (
        <AnimatedPage>
            <div>
                <h1>Posts</h1>
                {data && data.posts.map((post, index) => (
                    <div key={index} className={styles["post"]}>

                        <div className="post-info">
                            <h3>{post.title}</h3>
                            <p>Created: {formatDate(post.createdAt)}</p>
                        </div>
                        <Link to={`/blog/${post.id}`}>Read more</Link>

                    </div>
                ))}
            </div>
        </AnimatedPage>
    );
}
