import { nepal_location } from "../nepal_location.js";

document.addEventListener('DOMContentLoaded', () => {

  const province = document.querySelector('#province');
  const district = document.querySelector('#district');
  const municipality = document.querySelector('#municipality');

  nepal_location.provinceList.forEach((prov) => {
    const option = document.createElement('option');
    option.value = prov.name;
    option.textContent = prov.name;
    province.appendChild(option);
  })

  function updateDistrict() {
    let selectedProvince = province.value;
    let prov = nepal_location.provinceList.find((p) => p.name === selectedProvince);

    if(prov){
      prov.districtList.forEach((dist) => {
        const option = document.createElement('option');
        option.value = dist.name;
        option.textContent = dist.name;
        district.appendChild(option);
      })
    }
  }

  function updateMunicipality() {
    let selectedDistrict = district.value;
    for(let i=0; i < nepal_location.provinceList.length; i++){
      let dist = nepal_location.provinceList[i].districtList.find((d) => d.name === selectedDistrict );
      if(dist) {
        dist.municipalityList.forEach((mun) => {
          const option = document.createElement('option');
          option.value = mun.name;
          option.textContent = mun.name;
          municipality.appendChild(option);
        })
      }
    }
  }

  province.addEventListener('change', updateDistrict);
  district.addEventListener('change', updateMunicipality);


  const form = document.querySelector('form');
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
    firstNameValidations(fname),
    lastNameValidations(lname),
    emailValidations(email),
    ageValidation(age),
    genderValidation(gender),
    courseValidation(course),
    sportsValidation(sports),
    fileValidation(file),
    dateValidation(submissionDate),
    addressValidation(province.value, district.value, municipality.value)
  ];

    let valid = validations.every((val) => val === true);

    if (valid === true){
      renderForm(fname, lname, email, age, gender, course, sports, file, province, district, municipality, submissionDate);
    }

  });

  function checkSpecialCharacters(ErrorEl, name){
    for(let i=0; i<name.length; i++){
      let ch = name.charCodeAt(i)
      if(!(ch >= 65 && ch <= 90) && !(ch >= 97 && ch <= 122)){
        p.style.color = 'red';
        p.textContent = 'Special characters and numbers are not allowed';
        ErrorEl.appendChild(p);
        return false;
      }
    }
      return true;
  }

  function firstNameValidations(fname){
    const fnameError = document.querySelector('#fname-errors');
    fnameError.innerHTML = '';

    const check = checkSpecialCharacters(fnameError, fname);
    if(check === false){
      return check;
    }
    if(!fname) {
      fnameError.style.color = 'red';
      fnameError.style.marginTop = '5px';
      fnameError.textContent = '*';

      //fnameError.appendChild(p); 
      return false;
    }else{
      return true;
    }
  }

  function lastNameValidations(lname){
    const lnameErrors = document.querySelector('#lname-errors');
    lnameErrors.innerHTML = '';

    const check = checkSpecialCharacters(lnameErrors, lname);
    if(check === false){
      return check;
    }

    if(!lname) {
      lnameErrors.style.color = 'red';
      lnameErrors.style.marginTop = '5px';
      lnameErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  function emailValidations(email){
    const emailErrors = document.querySelector('#email-errors');
    emailErrors.innerHTML = '';
    //if email field is empty
    if(!email) {
      emailErrors.style.color = 'red';
      emailErrors.style.marginTop = '5px';
      emailErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  function ageValidation(age){
    const ageErrors = document.querySelector('#age-errors');
    ageErrors.innerHTML = '';
    if(!age){
      ageErrors.style.color = 'red';
      ageErrors.style.marginTop = '5px';
      ageErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  function genderValidation(gender){
    const genderErrors = document.querySelector('#gender-errors');
    genderErrors.innerHTML = '';
    if(gender === null) {
      genderErrors.style.color = 'red';
      genderErrors.style.marginTop = '5px';
      genderErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  function courseValidation(course){
    const courseErrors = document.querySelector('#course-errors');
    courseErrors.innerHTML = '';
    if(course == null){
      courseErrors.style.color = 'red';
      courseErrors.style.marginTop = '5px';
      courseErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  function sportsValidation(sports){
    const sportsErrors = document.querySelector('#sports-errors');
    sportsErrors.innerHTML = '';
    if (sports.length === 0){
      sportsErrors.style.color = 'red';
      sportsErrors.style.marginTop = '5px';
      sportsErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
  }


  function getFileExtension(filename){
    return filename.split('.').pop()
  }

  function fileValidation(file){
    const fileErrors = document.querySelector('#file-errors');
    fileErrors.innerHTML = '';

    if(!file){
      fileErrors.style.color = 'red';
      fileErrors.style.marginTop = '5px';
      fileErrors.textContent = '*';
      return false;
    }

    if(file && file.size > 5242880){
      fileErrors.style.color = 'red';
      fileErrors.style.marginTop = '5px';
      fileErrors.textContent = 'Filesize should be less than 5mb';
      return false;
    }

      const extension = getFileExtension(file.name);
      if(extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg' && extension !== 'webp') {
        fileErrors.style.color = 'red';
        fileErrors.style.marginTop = '5px';
        fileErrors.textContent = 'Upload a valid file (jpg, png, jpeg, webp)';
        return false;
    }
      return true;
  }

  function dateValidation(submissionDate){
    const dateErrors = document.querySelector('#date-errors');
    dateErrors.innerHTML = '';

    if(!submissionDate){
      dateErrors.style.color = 'red';
      dateErrors.style.marginTop = '5px';
      dateErrors.textContent = '*';
      return false;
    }

    return true;
  }

  function addressValidation(province, district, municipality){
    const addressErrors = document.querySelector('#address-errors');
    addressErrors.innerHTML = '';
    if(province === 'province' || province === '' || district === 'district' || district === '' || municipality === 'municipality' || municipality === ''){
      addressErrors.style.color = 'red';
      addressErrors.style.marginTop = '5px';
      addressErrors.textContent = '*';
      return false;
    }else{
      return true;
    }
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
