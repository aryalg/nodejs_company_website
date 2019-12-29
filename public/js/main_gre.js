let element = document.getElementById('div1');

let index = 0;

const myFunction = async () => {
  let name = document.querySelector('.name-input').value;
  let image = document.querySelector('.image-input').value;

  if (!name) {
    return false;
  }
  let arrayVocab = [];
  let arrayImage = [image];

  for (i = 1; i <= index; i++) {
    console.log(i);
    var body = document.querySelector(`.body-${i}`).value;
    var example = document.querySelector(`.example-${i}`).value;
    arrayVocab.push({ body, example });
    document.querySelector(`.body-${i}`).value = '';
    document.querySelector(`.example-${i}`).value = '';
  }

  var obj = {
    name,
    meaning: arrayVocab,
    images: arrayImage
  };
  // console.log(`Submit is pressed where name and meaning are ${index}`);

  try {
    await axios({
      method: 'POST',
      url: 'https://nearkathmandu.com/api/v1/english/vocab',
      data: obj
    });
    document.querySelector('.name-input').value = '';
    document.querySelector('.image-input').value = '';
  } catch (err) {
    console.log(err.message);
    console.log(`Submit is pressed where name and meaning are ${index}`);
  }
};

const updateForm = () => {
  index++;

  console.log(`updateForm pressed! ${index}`);
  var body = document.createElement('input');
  var example = document.createElement('input');
  var br1 = document.createElement('br');
  var br2 = document.createElement('br');

  body.placeholder = 'Enter meaning';
  body.className = `two-input-one-line-${index}`;
  example.className = `two-input-one-line-eg-${index}`;
  example.placeholder = 'Enter Example';
  // element.appendChild(body);
  // element.appendChild(example);

  document.querySelector('contact-form').appendChild(body);
  document.querySelector('contact-form').appendChild(example);
};

document.onkeyup = function(e) {
  // if (e.which == 78) {
  //   updateForm();
  // }
  // console.log(e.which);
};
