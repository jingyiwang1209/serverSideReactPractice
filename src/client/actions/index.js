export const FETCH_USERS = 'fetch_users';

export const fetchUsers = () => async (dispatch, getState, axioInstance) => {
    const res = await axioInstance.get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};