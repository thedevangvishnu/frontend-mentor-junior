// store reference to required elements

const mainContainer = document.querySelector(".main__container"),
  form = document.querySelector(".signup__form"),
  input = document.querySelector("input"),
  error = document.querySelector(".error__message"),
  subscribeBtn = document.querySelector(".subscribe"),
  thankyouContainer = document.querySelector(".thankyou__container"),
  dismissBtn = document.querySelector(".dismiss");

// handle submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// email validity
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // new learning
  return emailRegex.test(email);
};

// show error message for 1.5s
const showError = () => {
  error.classList.add("show__error");

  setTimeout(() => {
    error.classList.remove("show__error");
  }, 1500);
};

// switch states by adding appropriate classes
const switchState = () => {
  mainContainer.classList.add("hide");
  thankyouContainer.classList.add("show");
};

// switch to thankyou state when form is submitted

subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   switch states only if input is valid, othervise pop error message
  if (isValidEmail(input.value)) {
    switchState();
  } else {
    showError();
  }
});

// dismiss the thankyou message and display form again

dismissBtn.addEventListener("click", () => {
  window.location.reload(); // new method
});
