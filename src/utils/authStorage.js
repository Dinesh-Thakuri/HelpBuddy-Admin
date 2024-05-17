function setUserData({ userData, token }) {
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("token", JSON.stringify(token));
}

function getUserData() {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  return { token, userData };
}

function clearUserData() {
  localStorage.clear();
}

export { setUserData, getUserData, clearUserData };
