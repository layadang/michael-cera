var generateButton = document.getElementById('generate-btn');
var buttonText = 'see mikey boy now!';
var clickCount = 0;
var usedIndices = [];

function generateRandomImage() {
  var imageUrlElement = document.getElementById('michael-cera-image');
  var imageContainer = document.getElementById('image-container');

  imageUrlElement.style.opacity = 0;

  // silly alerts
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

  // generating random image
  var bucketName = 'testing-michael-cera';
  var apiUrl = 'https://www.googleapis.com/storage/v1/b/' + bucketName + '/o';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var objects = data.items;
      var availableIndices = objects.map((_, index) => index).filter(index => !usedIndices.includes(index));

      if (availableIndices.length === 0) {
        // reset after all images shown
        usedIndices = [];
        return;
      }

      var randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      var newImage = new Image();
      newImage.onload = function() {
        imageUrlElement.src = this.src;
        imageUrlElement.style.opacity = 1;
        imageContainer.style.display = 'block';
        generateButton.textContent = buttonText;
        usedIndices.push(randomIndex);
      };
      newImage.src = objects[randomIndex].mediaLink; // Start loading the new image
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

generateButton.addEventListener('click', generateRandomImage);
