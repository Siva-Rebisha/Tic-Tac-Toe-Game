function signup() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Fill all fields!");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");

  if (user === savedUser && pass === savedPass) {
    alert("Login successful!");
    window.location.href = "index.html"; // your game page
  } else {
    alert("Invalid credentials!");
  }
}
