export default class FileValidator {
  constructor(file){
    this.file= file
  }

  getFileExtension(fileName){
    return fileName.split('.').pop()
  }

  isNotEmpty(errorElement){
    errorElement.innerHTML = '';
    if(!this.file){
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = '*';
      return false;
    }else{
      return true;
    }
  }

  sizeIsLessThan5MB(errorElement){
    errorElement.innerHTML = '';
    if(this.file.size > (5*1024*1024)){
      errorElement.style.color = 'red';
      errorElement.style.marginTop = '5px';
      errorElement.textContent = 'File size should be less than 5MB';
      return false
    }
    return true
  }

  extensionIsValid(errorElement) {
      const extension = this.getFileExtension(this.file.name);
      if(extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg' && extension !== 'webp') {
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = 'Upload a valid file (jpg, png, jpeg, webp)';
        return false;
    }
      return true;
  }

}
