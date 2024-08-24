import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles/post.module.css';
import { useNavigate } from 'react-router-dom';


export default function Post() {

    const { postid } = useParams();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`hhttps://blog-api-top.adaptable.app/posts/${postid}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(post => {
                setTitle(post.post.title);
                setContent(post.post.content);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [postid]);

    const editPost = async (postId) => {

        try {



            const resp = await fetch(`https://blog-api-top.adaptable.app/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    published: true,
                })
            });

            if (!resp.ok) {
                throw new Error('Failed to update');
            }

        navigate('/posts');



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
        <div>
        <form className={styles["postform"]} onSubmit={(e) => {
                    e.preventDefault();  // Prevent default form submission
                    editPost(postid);
                }}>
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
            <button type="submit">Confirm</button>
        </form>
        </div>
    </>
    )

}