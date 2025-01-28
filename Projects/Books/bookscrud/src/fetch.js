//Add fetch functions
export const loginUser = async (credentials) => {
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

export const getBooks = async () => {
    try {
        const response = await fetch('http://localhost:5252/api/Books', {
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

export const getQuotes = async () => {
    try {
        const response = await fetch('http://localhost:5252/api/Quotes', {
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
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export const addBook = async (book, token) => {
    try {
        const response = await fetch('http://localhost:5252/api/Books', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(book)
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

export const addQoute = async (quote, token) => {
    try {
        const response = await fetch('http://localhost:5252/api/Quotes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quote)
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

export const editBook = async (book, token) => {
    try {
        const response = await fetch(`http://localhost:5252/api/Books/${book.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(book)
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

export const editQoute = async (quote, token) => {
    try {
        const response = await fetch(`http://localhost:5252/api/Quotes/${quote.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quote)
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

export const deleteBook = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:5252/api/Books/${id}`, {
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

export const deleteQuote = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:5252/api/Quotes/${id}`, {
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



