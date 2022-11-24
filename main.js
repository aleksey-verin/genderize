document.querySelector(".form").addEventListener("submit", function (event) {
  
  let targetInput = event.target.firstElementChild
  if (targetInput.value !== '') {
    event.preventDefault();
    showResult(targetInput)
    targetInput.value = ''
  } else {
    event.preventDefault();
  }
});

function showResult(input) {
  
  const firstName = input.value;
  const serverUrl = 'https://api.genderize.io';
  const url = `${serverUrl}?name=${firstName}`;

  let response = fetch(url)
  response
  .then(response => response.json())
  .then(function(data) {
    console.log(data)
    let nameForScreen = data.name[0].toUpperCase() + data.name.slice(1)
    
    if (data.gender) {
      
      document.querySelector('.text_result').innerHTML = `${nameForScreen} is <span>${data.gender}</span>`

      let probabilityForScreen = (data.probability * 100).toFixed(0)
      document.querySelector('.probability').textContent = `Probability: ${probabilityForScreen}%`

    } else {
      document.querySelector('.text_result').innerHTML = `Имя ${nameForScreen} </br><span>не найдено</span>`
      document.querySelector('.probability').textContent = ''

    }
  })
  .catch(function(err) {
    document.querySelector('.text_result').textContent = `Сервер не отвечает. Попробуйте позже`
    document.querySelector('.probability').textContent = ''
  })
}

// let response = fetch(url)
// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }







// console.log('stringWithInfo')
// console.log(response)
// console.log(stringWithInfo)
// {"count":27050,"gender":"male","name":"artem","probability":1.0}



