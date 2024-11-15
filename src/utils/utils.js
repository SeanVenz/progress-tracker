export const isAuthenticated = () => {
    // Check if user data exists in localStorage (or sessionStorage)
    const userSession = localStorage.getItem("userSession");
    return userSession ? JSON.parse(userSession) : null;
};

export const logOutUserDataFlower = async () => {
    try {
        // Clear session data from localStorage
        localStorage.removeItem("userSession");
        console.log("User logged out");
        return true;
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
