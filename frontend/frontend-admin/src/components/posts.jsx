import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/posts.module.css';

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newPost, setNewPost] = useState({title: '', content: ''});

    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(resp => {
                if(!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then(data => {
                setPosts(data);
                fetch(`http://localhost:3000/user/${data.posts.authorId}`);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    const handleClick = () => {

        view ? setView(false) : setView(true)

    }

    const handleSubmit = () => {

    }

    async function deletePost(id) {
        try {
            // Optimistically update the UI before making the fetch request
            setPosts(prevUsers => prevUsers.filter(user => user.id !== id));
    
            // Perform the delete operation
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the post');
            }
    
        } catch (error) {
            console.error("There was an error deleting the post:", error);
            setError(error);
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
                    {posts && posts.posts.map((post, index) => (
                        <div className={styles["post"]} key={index}>
                            <div className={styles["details"]}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <p>{post.createdAt}</p>
                                <p>{post.author.email}</p>
                            </div>
                            <div className="interactions">
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <div>

                    </div>
                </div>

            
            ) : (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Submit</button>
                </form>
            )}
            <button onClick={handleClick}>
                {view ? 'Create new post' : 'Cancel'}
            </button>
        </div>
        </>
        
    )

}