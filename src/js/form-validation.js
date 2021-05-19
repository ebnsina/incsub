import {
  isRequired,
  isBetween,
  isEmailValid,
  isPasswordValid,
  debounce,
} from './utils';

function formValidation() {
  const form = document.querySelector('form');
  const usernameEl = document.querySelector('#name');
  const emailEl = document.querySelector('#email');
  const passwordEl = document.querySelector('#password');
  const smallEl = document.querySelectorAll('small');

  smallEl.forEach((el) => (el.style.display = 'none'));

  const checkUsername = () => {
    let valid = false;
    const min = 3;
    const max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEl, 'Username cannot be blank');
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        `Username must be between ${min} and ${max} characters`
      );
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, 'Email cannot be blank');
    } else if (!isEmailValid(email)) {
      showError(emailEl, 'Please enter a valid email address');
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
      showError(passwordEl, 'Password cannot be blank');
    } else if (!isPasswordValid(password)) {
      showError(passwordEl, 'Minimum 8 characters');
    } else {
      showSuccess(passwordEl);
      valid = true;
    }

    return valid;
  };

  const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.style.display = 'block';
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
  };

  form.addEventListener(
    'input',
    debounce(function (e) {
      switch (e.target.id) {
        case 'username':
          checkUsername();
          break;
        case 'email':
          checkEmail();
          break;
        case 'password':
          checkPassword();
          break;
      }
    })
  );

  form.addEventListener('change', function () {
    const submitButton = document.querySelector('.button');

    const isUsernameValid = checkUsername();
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();

    let formIsValid = isUsernameValid && isEmailValid && isPasswordValid;

    submitButton.disabled = !formIsValid;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkUsername();
    checkEmail();
    checkPassword();
  });
}

export default formValidation;
