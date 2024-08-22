import { useState } from 'react';
import styles from './styles/comments.module.css';

function Comment({ title, email, content, created, onDelete, onUpdate }) {
    const [edit, setEdit] = useState(false);
    const [commentContent, setCommentContent] = useState(content);

    const handleChange = (e) => {
        setCommentContent(e.target.value);
    };

    const handleClick = () => {
        if (edit) {
            // If the user confirms the edit, handle the update
            onUpdate(commentContent);
        }
        // Toggle the edit state
        setEdit(!edit);
    };

    const handleDelete = () => {
        onDelete();
    };

    return (
        <div className={styles["content"]}>
            <div className="details">
                <h3>{title}, {email}</h3>
                {edit ? (
                    // Render the input field when in edit mode
                    <input
                        type="text"
                        name='content'
                        value={commentContent}
                        onChange={handleChange}
                    />
                ) : (
                    // Render the static content when not in edit mode
                    <p>{commentContent}</p>
                )}
                <p>{created}</p>
            </div>
            <div className={styles["interactions"]}>
                <button onClick={handleClick}>{edit ? 'Confirm' : 'Edit'}</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Comment;
