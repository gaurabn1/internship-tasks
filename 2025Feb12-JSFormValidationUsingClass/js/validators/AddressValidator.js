export default class AddressValidator {
  constructor(province, district, municipality) {
    this.province = province.value;
    this.district = district.value;
    this.municipality = municipality.value;
  }

  isNotEmpty(errorElement) {
    errorElement.innerHTML = '';
    if(this.province === 'province' || this.province === '' || this.district === 'district' || this.district === '' || this.municipality === 'municipality' || this.municipality === ''){
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    }else{
      return true;
    }
  }
}
