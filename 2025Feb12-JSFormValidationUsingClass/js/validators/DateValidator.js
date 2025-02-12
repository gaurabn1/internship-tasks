export default class DateValidator {
  constructor(date) {
    this.date = date
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';
    if (!this.date) {
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    } else {
      return true;
    }
  }

}
