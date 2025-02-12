export default class AgeValidator {
  constructor(age) {
    this.age = age
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';
    if(this.age.trim() === ''){
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    }else{
      return true;
    }
  }
}
