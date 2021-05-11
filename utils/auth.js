// middleware fn to authguard site routes
const withAuth = (req, res, next) => {
  // if user session is not logged in
  if (!req.session.user_id) {
    // redirect user to login page
    res.redirect("/login");
    // if user is logged in
  } else {
    // call next anon fn
    next();
  }
};

module.exports = withAuth;
