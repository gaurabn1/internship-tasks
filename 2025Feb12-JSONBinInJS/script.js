document.addEventListener('DOMContentLoaded', () => {

  const lists = document.querySelector('#lists');
  
  const createBin = async () => {
    console.log('Creating bin...')
    const url = 'https://api.jsonbin.io/v3/b';
    const data = {
      "firstName" : "Gaurab",
      "lastName" : "Neupane"
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'X-Master-Key' : '$2a$10$UVfjGLCWQtXWynVN/BVqUOvnoyc4Io6zE/rEsu1tHzGxFJIMLRlTa',
        'X-Access-Key' : '$2a$10$WNlGwJgSz6.KVt0ubuz.qeP5PDqID9k.8PD69WYr2dqIhH0k7yZeC',
      },
      body: JSON.stringify(data)
    });

    if(!response.ok) {
      alert(response.status)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  }

  //createBin();
  
  const readBin = async () => {
    console.log('Reading bin...')
    const url = 'https://api.jsonbin.io/v3/b/67ac78d0ad19ca34f8006e6b';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'X-Master-Key' : '$2a$10$UVfjGLCWQtXWynVN/BVqUOvnoyc4Io6zE/rEsu1tHzGxFJIMLRlTa',
        'X-Access-Key' : '$2a$10$WNlGwJgSz6.KVt0ubuz.qeP5PDqID9k.8PD69WYr2dqIhH0k7yZeC',
      },
    });

    const result = await response.json();
    console.log(result);
  }

  //readBin();
  
  const updateBin = async () => {
    console.log('Updating bin...')
    const url = 'https://api.jsonbin.io/v3/b/67ac78d0ad19ca34f8006e6b';
    const data = {
      'firstName' : "John",
      'lastName' : "Cena"
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'X-Master-Key' : '$2a$10$UVfjGLCWQtXWynVN/BVqUOvnoyc4Io6zE/rEsu1tHzGxFJIMLRlTa',
        'X-Access-Key' : '$2a$10$WNlGwJgSz6.KVt0ubuz.qeP5PDqID9k.8PD69WYr2dqIhH0k7yZeC',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  }

  //updateBin();
  
  const deleteBin = async () => {
    const url = 'https://api.jsonbin.io/v3/b/67ac78d0ad19ca34f8006e6b';

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'X-Master-Key' : '$2a$10$UVfjGLCWQtXWynVN/BVqUOvnoyc4Io6zE/rEsu1tHzGxFJIMLRlTa',
        'X-Access-Key' : '$2a$10$WNlGwJgSz6.KVt0ubuz.qeP5PDqID9k.8PD69WYr2dqIhH0k7yZeC',
      },
    });

  if(!response.ok) {
    new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json()
  console.log(result)

  }

  //deleteBin();


})
