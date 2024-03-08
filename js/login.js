const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login-form");

input.addEventListener("input", (e) => {
  button.disabled = !e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("nickname", input.value);
  window.location.href = "pages/game.html";
});
