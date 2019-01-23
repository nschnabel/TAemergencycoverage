let UserProfile = (function() {
  let logged_in = false;
  let admin = false;
  let user = "";

  let loggedIn = function() {
    return logged_in;
  };

  let logIn = function() {
    logged_in = true;
  };

  let logOut = function() {
    logged_in = false;
  };

  let isAdmin = function() {
    return admin;
  };

  let setAdmin = function() {
    admin = true;
  };

  let setTA = function() {
    admin = false;
  };

  let setUser = function(u) {
    user = u;
    // Also set this in cookie/localStorage
  };

  let getUser = function() {
    return user;
  };

  return {
    loggedIn: loggedIn,
    logIn: logIn,
    logOut: logOut,
    isAdmin: isAdmin,
    setAdmin: setAdmin,
    setTA: setTA,
    setUser: setUser,
    getUser: getUser
  };
})();

export default UserProfile;
