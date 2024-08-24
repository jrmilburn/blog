import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/posts.module.css';


export default function Posts({ user }) {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('https://blog-api-top.adaptable.app/posts')
            .then(resp => {
                if(!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then(data => {
                setPosts(data.posts);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [posts]);

    const handleClick = () => {

        setView(!view);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch('https://blog-api-top.adaptable.app/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    published: true,
            })});

            if (!resp.ok) {
                throw new Error('Failed to create post');
            }

            const createdPost = await resp.json();
            setPosts((prevPosts) => [...prevPosts, createdPost]);

            // Reset form and state
            setTitle('');
            setContent('');
            setView(true);

            // Navigate to the posts view
            navigate("/posts");

        } catch (error) {
            console.error('Error creating post:', error);
            setError(error.message);
        }
    };


    const deletePost = async (postId) => {

        try {
            setPosts(prevPosts => prevPosts.filter(post => post.id  !== postId));


            const resp = await fetch(`https://blog-api-top.adaptable.app/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    published: true,
                    author: {
                        email: ''
                    }
                })
            });

            if (!resp.ok) {
                throw new Error('Failed to delete the user');
            }



        } catch(err) {
            setError(err);
        }

    }
    
    

    if(loading) return(
        <div className={styles["loading"]}>
            Loading...
        </div>
    )

    if(error) return <p>Error: {error.message}</p>

    return (
        <>   
        <div className={styles["posts"]}>
        <h2>{view ? 'Posts' : 'Create Post'}</h2>

            {view ? (

                <div>
                    {posts && posts.map((post, index) => (
                        <div className={styles["post"]} key={index}>
                            <div className={styles["details"]}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <p>{post.createdAt}</p>
                                <p>{post.author.email}</p>
                            </div>
                            <div className={styles["interactions"]}>
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                                <Link to={`/posts/${post.id}`}>Edit post</Link>
                                <Link to={`/posts/${post.id}/comments`}>View comments</Link>
                            </div>
                        </div>
                    ))}
                    <div>

                    </div>
                </div>

            
            ) : (
                <div>
                    <form>
                        <div className={styles['input']}>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles['input']}>
                            <label htmlFor="content">Content:</label>
                            <textarea
                                id="content"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows="100" // Adjust rows for the height of the textarea
                                cols="100" // Adjust cols for the width of the textarea
                                required
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            )}
            <button onClick={handleClick}>
                {view ? 'Create new post' : 'Cancel'}
            </button>
        </div>
        </>
        
    )

}