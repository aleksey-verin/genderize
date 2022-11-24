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

function rus_to_latin ( str ) {
    
  var ru = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
      'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
      'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
      'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
      'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
  'ъ': 'ie', 'ь': '', 'й': 'i'
  }, n_str = [];
      
  for ( var i = 0; i < str.length; ++i ) {
     n_str.push(
            ru[ str[i] ]
         || ru[ str[i].toLowerCase() ] == undefined && str[i]
         || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
     );
  }
  
  return n_str.join('');
}

// const str = 'No Dsdsd Я Тестовая СТРОКА... И во мне есть все, ну или почти, элементы знаков припинания!';
// console.log(rus_to_latin(str)); //Ya Testovaya STROKA... I vo mne est vse, nu ili pochti, elementy znakov pripinaniya!






function showResult(input) {

  // console.log(rus_to_latin(input.value))

  let newNameForRus = rus_to_latin(input.value)
  console.log(newNameForRus)

  let nameAAAA = input.value
  const firstName = newNameForRus;
  const serverUrl = 'https://api.genderize.io';
  const url = `${serverUrl}?name=${firstName}`;
  
  // console.log(input.value)
  let response = fetch(url)
  response
  .then(response => response.json())
  .then(function(data) {
    let nameForScreen = nameAAAA[0].toUpperCase() + nameAAAA.slice(1)
    let probabilityForScreen = (data.probability * 100).toFixed(0)
    console.log(nameAAAA)
    
    if (data.gender) {
      // console.log(input.value)
      let pol
      if (data.gender === 'male') {
        pol = 'мужчина'
      } else {
        pol = 'женщина'
      }


      document.querySelector('.text_result').innerHTML = `<span>${nameForScreen}</span> - <span>${pol}</span>`
      document.querySelector('.probability').textContent = `С вероятностью: ${probabilityForScreen}%`
    } else {
      document.querySelector('.text_result').innerHTML = `Имя <span>${nameForScreen}</span> </br><span>не найдено</span>`
      document.querySelector('.probability').textContent = ''
    }
  })
  .catch(function(err) {
    document.querySelector('.text_result').textContent = `Сервер не отвечает. Попробуйте позже`
    document.querySelector('.probability').textContent = ''
  })
}


