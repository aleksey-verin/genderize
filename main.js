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

function showResult(input) {

  const nameWithoutTranslate = input.value
  const nameAfterTranslate = rus_to_latin(input.value)

  const firstName = nameAfterTranslate;
  const serverUrl = 'https://api.genderize.io';
  const url = `${serverUrl}?name=${firstName}`;
  
  let response = fetch(url)
  response
  .then(response => response.json())
  .then(function(data) {
    let nameForScreen = nameWithoutTranslate[0].toUpperCase() + nameWithoutTranslate.slice(1)
    let probabilityForScreen = (data.probability * 100).toFixed(0)
    
    if (data.gender) {

      let genderAfterTranslate
      if (data.gender === 'male') {
        genderAfterTranslate = 'мужчина'
      } else {
        genderAfterTranslate = 'женщина'
      }
      
      document.querySelector('.text_result').innerHTML = `<span>${nameForScreen}</span> - <span>${genderAfterTranslate}</span>`
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


