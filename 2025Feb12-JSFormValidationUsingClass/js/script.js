import GetAddresses from "./GetAddresses.js";
import { nepal_location } from "./../nepal_location.js"

//Validators
import NameValidator from "./validators/NameValidator.js";
import EmailValidator from "./validators/EmailValidator.js";
import AgeValidator from "./validators/AgeValidator.js";
import GenderValidator from "./validators/GenderValidator.js";
import CourseValidator from "./validators/CourseValidator.js";
import FavouriteSportsValidator from "./validators/FavouriteSportsValidator.js"
import FileValidator from "./validators/FileValidator.js";
import DateValidator from "./validators/DateValidator.js";
import AddressValidator from "./validators/AddressValidator.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const province = document.querySelector('#province');
  const district = document.querySelector('#district');
  const municipality = document.querySelector('#municipality');

  const address = new GetAddresses(province, district, municipality, nepal_location);
  address.getProvinces();
  province.addEventListener('change', () => address.getDistricts(province.value));
  district.addEventListener('change', () => address.getMunicipalities(district.value));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const email = document.querySelector('#email').value;
    const age = document.querySelector('#age').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const course = document.querySelector('input[name="course"]:checked');
    const sportsNodeList = document.querySelectorAll('input[name="sport"]:checked');
    let sports= Array.from(sportsNodeList);
    const file = document.querySelector('#certificate').files[0];
    const submissionDate = document.querySelector('#submission').value;

    let validations = [
      firstNameValidator(fname),
      lastNameValidator(lname),
      emailValidator(email),
      ageValidator(age),
      genderValidator(gender),
      courseValidator(course),
      sportsValidator(sports),
      dateValidator(submissionDate),
      addressValidator(province, district, municipality),
      fileValidator(file),
    ]

      let valid = validations.every((val) => val === true);
    if (valid === true){
      renderForm(fname, lname, email, age, gender, course, sports, file, province, district, municipality, submissionDate);
    }

  })

  function checkValid(validators) {
    let valid = validators.every((val) => val === true)
    return valid
  }


  function firstNameValidator(fname){
    const fnameError = document.querySelector('#fname-errors');
    const validator = new NameValidator(fname);
    let validators = [
      validator.isNotEmpty(fnameError),
      validator.checkSpecialCharacters(fnameError)
    ]

    return checkValid(validators)

  }

  function lastNameValidator(lname){
    const lnameError = document.querySelector('#lname-errors');
    const validator = new NameValidator(lname);
    let validators = [
      validator.isNotEmpty(lnameError),
      validator.checkSpecialCharacters(lnameError)
    ]

    return checkValid(validators)
  }

  function emailValidator(email) {
    const emailError = document.querySelector('#email-errors');
    const validator = new EmailValidator(email);
    let validators = [
      validator.isNotEmpty(emailError),
    ]

    return checkValid(validators)
  }


  function ageValidator(age) {
    const ageError = document.querySelector('#age-errors');
    const validator = new AgeValidator(age);
    let validators = [
      validator.isNotEmpty(ageError),
    ]

    return checkValid(validators)
  }

  function genderValidator(gender) {
    const genderError = document.querySelector('#gender-errors');
    const validator = new GenderValidator(gender);
    let validators = [
      validator.isNotEmpty(genderError),
    ]

    return checkValid(validators)
  }

  function courseValidator(course) {
    const courseError = document.querySelector('#course-errors');
    const validator = new CourseValidator(course);
    let validators = [
      validator.isNotEmpty(courseError),
    ]
    return checkValid(validators)
  }

  function sportsValidator(sports){
    const sportsError = document.querySelector('#sports-errors');
    const validator = new FavouriteSportsValidator(sports);
    let validators = [
      validator.isNotEmpty(sportsError),
    ]
    return checkValid(validators)
  }

  function fileValidator(file){
    const fileError = document.querySelector('#file-errors');
    const validator = new FileValidator(file);
    let validators = [
      validator.isNotEmpty(fileError),
      validator.extensionIsValid(fileError),
      validator.sizeIsLessThan5MB(fileError)
    ]
    return checkValid(validators)
  }

  function dateValidator(submissionDate){
    const submissionDateError = document.querySelector('#date-errors');
    const validator = new DateValidator(submissionDate);
    let validators = [
      validator.isNotEmpty(submissionDateError),
    ]
    return checkValid(validators)
  }

  function addressValidator(province, district, municipality) {
    const addressError = document.querySelector('#address-errors');
    const validator = new AddressValidator(province, district, municipality);
    let validators = [
      validator.isNotEmpty(addressError),
    ]
    return checkValid(validators)
  }


  function renderForm(fname, lname, email, age, gender, course, sports, file, province, district, municipality, submissionDate){

    const renderForm = document.querySelector("aside");
    renderForm.style.display = 'block';

    const fav_sports = []
    for (let sport of sports){
      sport = sport.value.toUpperCase();
      fav_sports.push(sport);
    }
    document.querySelector('#sports-data').textContent = fav_sports.join(', ');
    document.querySelector('#fname-data').textContent = fname;
    document.querySelector('#lname-data').textContent = lname;
    document.querySelector('#email-data').textContent = email;
    document.querySelector('#age-data').textContent = age;
    document.querySelector('#gender-data').textContent = gender.value.toUpperCase();
    document.querySelector('#course-data').textContent = course.value.toUpperCase();
    document.querySelector('#certificate-data').textContent = file.name;
    document.querySelector('#address-data').textContent = `${province.value}, ${district.value}, ${municipality.value}`;
    document.querySelector('#submission-data').textContent = submissionDate;
      const renderImage = document.querySelector('#render-image');
      const reader  = new FileReader();
      reader.addEventListener('load', () => {
        renderImage.src = reader.result;
      }, false)

    if(file){
      reader.readAsDataURL(file);

    }

  }

  });
