exports.getCurrentUser = () => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token  = localStorage.getItem('token');
    const user = {
        username:username,
        token:token
    }
    return user;
  };
  