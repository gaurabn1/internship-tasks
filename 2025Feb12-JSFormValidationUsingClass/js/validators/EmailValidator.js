export default class EmailValidator {
  constructor(email) {
    this.email = email
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';

    if(this.email.trim() === ''){
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

}
