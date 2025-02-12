export default class CourseValidator {
  constructor(course) {
    this.course = course
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';
    if (!this.course) {
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    } else {
      return true;
    }
  }
}
