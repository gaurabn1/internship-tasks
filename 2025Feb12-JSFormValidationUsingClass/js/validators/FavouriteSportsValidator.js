export default class FavouriteSportsValidator {
  constructor(sports) {
    this.sports = [...sports];
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';
    if (this.sports.length === 0) {
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    } else {
      return true;
    }
  }

}
