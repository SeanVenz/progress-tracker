import axios from 'axios';
import bcrypt from 'bcryptjs';

export const registerUserDataFlower = async (username, email, password) => {
    try {
        const response = await axios.get(
            'https://dataflower.io/api/query/storage/users/5d03399f-68cc-4108-a895-6c3571a9b69d',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }
        );

        const users = response.data.data;
        const isUsernameTaken = users.some(user => user.username === username);
        const isEmailTaken = users.some(user => user.email === email);

        if (isUsernameTaken) {
            alert("This username is already chosen. Please select a different one.");
            return;
        }

        if (isEmailTaken) {
            alert("This email is already registered. Please use a different email.");
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10); 

        const registerResponse = await axios.post(
            'https://dataflower.io/api/query/storage/users/5d03399f-68cc-4108-a895-6c3571a9b69d',
            {
                data: {
                    username,
                    email,
                    password : hashedPassword
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }
        );

        console.log("User registered:", registerResponse.data);
        return registerResponse.data;
    } catch (error) {
        console.error("Error registering user:", error.response ? error.response.data : error.message);
    }
};

export const logInUserDataFlower = async (username, password) => {
    try {
        const response = await axios.post(
            'https://dataflower.io/api/query/storage/users/5d03399f-68cc-4108-a895-6c3571a9b69d/authenticate',
            {   
                username,
                password 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }
        );

        const user = response.data.data;
        console.log(user);

        if (user) {
            localStorage.setItem("userSession", JSON.stringify({ userId: user.id, username: user.username }));
            console.log("Login successful");
            return user;  
        } else {
            console.error("Authentication failed: User not found or incorrect credentials");
            return false;  
        }
    } catch (error) {
        console.error("Error during authentication:", error.response ? error.response.data : error.message);
        return false; 
    }
};

// export const updateUserData = async (docId, title, year, author, message) => {
//     try {
//         const response = await axios.put(
//             `https://dataflower.io/api/query/storage/datas/ee4145ee-09f7-4fd0-be7b-6758c81ba37b/dataId/${docId}`,
//             {
//                 data: {
//                     title,
//                     year,
//                     author,
//                     message
//                 }
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-API-Key': process.env.REACT_APP_API_KEY,
//                     'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
//                 }
//             }
//         );

//         console.log("Document data:", response.data.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error retrieving document:", error.response ? error.response.data : error.message);
//     }
// };

export const addDocumentDataFlower = async (task, description, dueDate, notes, progress, category, status, size, userName) => {
    try {
        const response = await axios.post(
            'https://dataflower.io/api/query/storage/datas/b7841fa2-49c6-4b65-9a46-d4fbd5f9c5df',
            {
                data: {
                    task, description, dueDate, notes, progress, category, status, size, userName
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }

        );

        console.log("Document added:", response.data);
    } catch (error) {
        console.error("Error creating document:", error.response ? error.response.data : error.message);
    }
};

export const getDocumentDataFlower = async () => {
    try {
        const response = await axios.get(
            'https://dataflower.io/api/query/storage/datas/b7841fa2-49c6-4b65-9a46-d4fbd5f9c5df',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }
        );

        console.log("Document data:", response.data.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving document:", error.response ? error.response.data : error.message);
    }
};

export const deleteDocumentDataFlower = async (docId) => {
    try {
        const response = await axios.delete(
            `https://dataflower.io/api/query/storage/datas/b7841fa2-49c6-4b65-9a46-d4fbd5f9c5df/dataId/${docId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }
        );

        console.log("Document data:", response.data.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving document:", error.response ? error.response.data : error.message);
    }
};

export const updateDocumentDataFlower = async (docId, task, description, dueDate, notes, progress, category, status, size, userName) => {
    try {
        const response = await axios.put(
            `https://dataflower.io/api/query/storage/datas/b7841fa2-49c6-4b65-9a46-d4fbd5f9c5df/dataId/${docId}`,
            {
                data: {
                    task, description, dueDate, notes, progress, category, status, size, userName
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_API_KEY,
                    'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
                }
            }
        );

        console.log("Document data:", response.data.data);
        return response.data;
    } catch (error) {
        console.error("Error retrieving document:", error.response ? error.response.data : error.message);
    }
};

export const uploadFileDataFlower = async (dataId, fieldName, file) => {
    try {
        const formData = new FormData();
        formData.append(fieldName, file);

        const uploadUrl = `https://dataflower.io/api/query/storage/datas/606907e9-bedc-4895-adb1-734b8bbb3a98/dataId/${dataId}/upload`;

        const response = await axios.post(uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-API-Key': process.env.REACT_APP_API_KEY,
                'X-Secret-Key': process.env.REACT_APP_SECRET_KEY
            }
        });

        console.log('File upload successful', response.data);
        return response.data;  
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        return false;  
    }
};
