import { Client, Databases, ID, Query, Storage, Account } from "appwrite";

export const client = new Client()
    .setProject('6735674e0020b9b14086')
    .setEndpoint('https://cloud.appwrite.io/v1');

export const databases = new Databases(client);

export const storage = new Storage(client);

export const account = new Account(client);

export const addDocument = async () => {
    try {
        const response = await databases.createDocument(
            '67356a24001108b9e134', // Database ID
            '6735784f002e1f00879e', // Collection ID
            ID.unique(), // Unique Document ID
            { "title": "hehe" } // Document data
        );
        console.log("Document added:", response);
    } catch (error) {
        console.error("Error creating document:", error);
    }
}

export const getDocument = async () => {
    try {
        const response = await databases.listDocuments(
            '67356a24001108b9e134',
            '67356ae500022c2aac7f',
        );
        console.log(response);
    }
    catch (err) {
        console.log(err);
    }
}

// export const createDatabaseRelationship = () => {
//     databases.createRelationshipAttribute(
//         'marvel',     // Database ID
//         'movies',     // Collection ID
//         'reviews',    // Related collection ID
//         'oneToMany',  // Relationship type
//         true,         // Is two-way
//         'reviews',    // Attribute key 
//         'movie',      // Two-way attribute key
//         'cascade'     // On delete action
//     );
// }

export const addDocumentWithRelationship = async (title, year, author, message, file) => {
    try {

        const url = await uploadImage(file);
        year = Number(year)
        await databases.createDocument(
            '67357b620030fca254c7',
            '67357b72000e5565f157',
            ID.unique(),
            {
                title,
                year,
                reviews: [
                    { author, message }
                ],
                url
            }
        )
    }
    catch (err) {
        console.log(err);
    }
}

export const getDocumentWithRelationship = async () => {
    try {
        // Fetch documents with a filter on title
        const response = await databases.listDocuments(
            '67357b620030fca254c7', // Database ID
            '67357b72000e5565f157', // Collection ID for movies
            // [remove if no need for query
            //     Query.equal('title', 'Spiderman') // Query filter by title
            // ]
        );

        // If no documents found, return empty array
        if (response.documents.length === 0) {
            return { documents: [] };
        }

        // Assuming the response includes related reviews as part of the document data
        // If you need to manually fetch reviews based on references, you can query them separately
        const documents = response.documents.map(doc => {
            // Assuming each document has a 'reviews' field that stores related review IDs
            // Manually fetching reviews if needed (this depends on how the relationships are structured)
            // Example:
            const reviews = doc.reviews || [];
            return { ...doc, reviews }; // Attach the reviews to the document
        });

        return { documents }; // Return the documents with their associated reviews

    } catch (err) {
        console.error('Error fetching documents:', err);
        return { documents: [] }; // Return an empty array on error
    }
};

export const uploadImage = async (file) => {
    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    try {
        const response = await storage.createFile(
            '67358a53000a65e2b523',
            ID.unique(),
            file // The image file to upload
        );

        if (response) {
            // Get the file URL using the file's ID
            console.log(response)
            console.log(response.$id)
            const fileId = response.$id; // Get the ID of the uploaded file
            const fileUrl = storage.getFilePreview('67358a53000a65e2b523', fileId); // Retrieve the URL for the file
            return fileUrl; // Return the URL
        }
        console.log('File uploaded:', response);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
};

export const updateDocumentWithRelationship = async (docId, title, year, author, message, file) => {
    try {
        // Upload image if a new file is provided
        const url = file ? await uploadImage(file) : null; // If no file, keep the old URL

        year = Number(year); // Ensure year is a number

        // Create the updated document data
        const updatedData = {
            title,
            year,
            reviews: [{ author, message }],
            url: url || undefined, // If url is null, do not update the field
        };

        // Update the document in Appwrite
        const response = await databases.updateDocument(
            '67357b620030fca254c7', // Your database ID
            '67357b72000e5565f157', // Your collection ID
            docId,                   // The ID of the document you want to update
            updatedData              // The new data to update the document with
        );

        return response;
    } catch (err) {
        console.error('Error updating document:', err);
    }
};

export const deleteDocumentWithRelationship = async (docId, imageUrl) => {
    try {
        if (imageUrl) {
            const fileId = imageUrl.split('/').pop(); // Assuming the image URL ends with the file ID
            const storageResponse = await storage.deleteFile('your-bucket-id', fileId); // Your Appwrite bucket ID
            console.log('Image deleted:', storageResponse);
        }
        // Delete the document from Appwrite
        const response = await databases.deleteDocument(
            '67357b620030fca254c7', // Your database ID
            '67357b72000e5565f157', // Your collection ID
            docId                   // The ID of the document to delete
        );

        return response;
    } catch (err) {
        console.error('Error deleting document:', err);
    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await account.create(ID.unique(), email, password);
        console.log('User registered:', response);
        return response;
    } catch (err) {
        console.error('Error during registration:', err);
    }
};


export const loginUser = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        console.log('User logged in:', response);
        return response;
    } catch (err) {
        console.error('Error during login:', err);
    }
};

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        console.log('User logged out');
        return true;
    } catch (err) {
        console.error('Error during logout:', err);
    }
};

export const isAuthenticated = async () => {
    try {
      const session = await account.getSession('current'); // Get the current session
      return session; // If session exists, return the session
    } catch (error) {
      return null; // If no session, return null
    }
  };