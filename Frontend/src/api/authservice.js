export const getAccessToken = () => sessionStorage.getItem('access');
export const getRefreshToken = () => sessionStorage.getItem('refresh');

export const setAccessToken = (token) => sessionStorage.setItem('access', token);
export const setRefreshToken = (token) => sessionStorage.setItem('refresh', token);

export const removeTokens = () => {
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
};