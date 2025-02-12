export default class NameValidator{
  constructor(name) {
    this.name = name
  }

  isNotEmpty(errorElement){
    errorElement.innerHTML = '';
    if(this.name.trim() === ''){
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  checkSpecialCharacters(errorElement){
    for(let i=0; i<this.name.length; i++){
      let ch = this.name.charCodeAt(i)
      if(!(ch >= 65 && ch <= 90) && !(ch >= 97 && ch <= 122)){
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = 'Special characters and numbers are not allowed';
        return false;
      }
    }
    return true;
  }

}
