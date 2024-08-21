import { useState, useEffect } from 'react';

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log(data);

    return (
        <div>
            <h1>Posts</h1>
            {data && data.posts.map((post, index) => (
                <div key={index}>

                    <h3>{post.title}</h3>
                    <p>{post.conent}</p>
                    <p>Created: {post.createdAt}</p>

                </div>
            ))}
        </div>
    );
}
