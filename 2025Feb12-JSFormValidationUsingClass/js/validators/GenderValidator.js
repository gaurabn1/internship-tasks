export default class GenderValidator {
  constructor(gender) {
    this.gender = gender
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';
    if(this.gender === null) {
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    }else{
      return true;
    }
  }
}
