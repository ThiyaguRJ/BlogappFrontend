//export const AUTH_API = "http://localhost:3000/api";
export const AUTH_API = "blogappbackend-production-6644.up.railway.app";

export const BASE_API = {
  LOGIN_USER: `${AUTH_API}/auth/login`,
  REGISTER_USER: `${AUTH_API}/auth/register`,
  LOGOUT_USER: `${AUTH_API}/auth/logout`,
  CHECK_AUTH: `${AUTH_API}/auth/check-auth`,

  GET_ALL_USERS: `${AUTH_API}/auth/getallusers`,
  UPDATE_ROLE: `${AUTH_API}/auth/updateroleuser`,
  DELETE_USER_ROLE: `${AUTH_API}/auth/deleteuser`,

  SEND_RESET_OTP: `${AUTH_API}/auth/sendotp`,
  RESET_PASSWORD: `${AUTH_API}/auth/resetpassword`,

  //Blog API
  CREATE_BLOG: `${AUTH_API}/blog/createblog`,
  GET_SINGLE_BLOG: `${AUTH_API}/blog/singleblog`,
  GET_ALL_BLOG: `${AUTH_API}/blog/getallposts`,
  LIKE_BLOG: `${AUTH_API}/blog/posts/like`,
  COMMENT_BLOG: `${AUTH_API}/blog/posts/comment`,
};
