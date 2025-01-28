//Add fetch functions
export const loginUser = async (credentials: any) => {
    try {
        const response = await fetch('http://localhost:5252/api/Auth/login', {
            method: 'POST',
            mode: 'cors', // Allow cross-origin requests
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        return data; // Return the response data
    } catch (error) {
        console.error('Error logging in:', error);
        return null; // Return null if an error occurs
    }
}

export const getTodo = async () => {
    try {
        const response = await fetch('http://localhost:5252/api/Todo', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export const addTodo = async (todo: any, token: any) => {
    try {
        const response = await fetch('http://localhost:5252/api/Todo', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(todo)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export const editTodo = async (todo: any, token: any) => {
    try {
        const response = await fetch(`http://localhost:5252/api/Todo/${todo.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(todo)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export const deleteTodo = async (id: any, token: any) => {
    try {
        const response = await fetch(`http://localhost:5252/api/Todo/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}



