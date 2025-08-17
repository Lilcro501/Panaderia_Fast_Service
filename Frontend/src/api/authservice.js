export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');

export const setAccessToken = (token) => localStorage.setItem('access', token);
export const setRefreshToken = (token) => localStorage.setItem('refresh', token);

export const removeTokens = () => {
    localStorage.removeItem('access');
    ocalStorage.removeItem('refresh');
};