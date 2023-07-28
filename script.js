var generateButton = document.getElementById('generate-btn');
var buttonText = 'Generate';
var clickCount = 0;

function generateRandomImage() {
  if (clickCount == 1) {
    buttonText = 'another one?';
  }

  clickCount++;
  if (clickCount === 5) {
    buttonText = 'really? you want more?';
  }

  if (clickCount === 10) {
    alert('hey,.. you just looked at 10 pictures of michael cera in one sitting. get some help?');
  }

  if (clickCount >= 11) {
    alert('stop it.');
  }

  var bucketName = 'testing-michael-cera';
  var apiUrl = 'https://www.googleapis.com/storage/v1/b/' + bucketName + '/o';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var objects = data.items;
      var randomIndex = Math.floor(Math.random() * objects.length);
      var imageUrlElement = document.getElementById('michael-cera-image');
      imageUrlElement.src = objects[randomIndex].mediaLink;
      var imageContainer = document.getElementById('image-container');
      imageContainer.style.display = 'block';
      generateButton.textContent = buttonText;
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

generateButton.addEventListener('click', generateRandomImage);
