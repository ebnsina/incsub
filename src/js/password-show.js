function passwordShow() {
  const eyeIcon = document.querySelector('.eye-icon');
  const inputPassword = document.querySelector('.pass-fieldset input');

  eyeIcon.addEventListener('click', () => {
    inputPassword.type === 'text'
      ? (inputPassword.type = 'password')
      : (inputPassword.type = 'text');
  });
}

export default passwordShow;
