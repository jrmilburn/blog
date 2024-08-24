import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/users.module.css';

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({name: '', email: '', password: ''});

    useEffect(() => {
        fetch('https://blog-api-top.adaptable.app/user')
            .then(resp => {
                if(!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch('https://blog-api-top.adaptable.app/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });


            if(!resp.ok) {
                throw new Error('Failed to create user');
            }

            const createdUser = await resp.json();
            setUsers([...users, createdUser]);
            setNewUser({name: '', email: '', password: ''});
        } catch (error) {
            console.error('Error creating user: ', error);
            setError(error);
        }
    }

    async function deleteUser(id) {
        try {
            // Optimistically update the UI before making the fetch request
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    
            // Perform the delete operation
            const response = await fetch(`https://blog-api-top.adaptable.app/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the user');
            }
    
        } catch (error) {
            console.error("There was an error deleting the user:", error);
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
        <div className={styles["users"]}>
            <h2>Users</h2>
            {users && users.map((user, index) => (
                <div className={styles["user"]} key={index}>
                    <div className={styles["details"]}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.createdAt}</p>
                    </div>
                    <div className="interactions">
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <h2>Add a user</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newUser.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create User</button>
            </form>

        </div>
    )

}