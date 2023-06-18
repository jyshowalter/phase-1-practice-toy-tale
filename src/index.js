let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  loadToys()
});

function loadToys() {
  fetch("http://localhost:3000/toys")
  .then(res => {
    return res.json();
  })
  .then(toys => {
    toys.forEach(toy => renderToys(toy));
//    console.log(toy);
  })
}

function renderToys (singleToy) {
    const toyDiv = document.createElement('div')
    toyDiv.className = 'card'

    const toyName = document.createElement('h2')
    toyName.textContent = singleToy.name

    const toyImage = document.createElement('img')
    toyImage.src = singleToy.image
    toyImage.className = 'toy-avatar'

    const toyLikes = document.createElement('p')
    toyLikes.textContent = singleToy.likes + " Likes"

    const likeButton = document.createElement('button')
    likeButton.textContent = '❤️'
    likeButton.addEventListener("click", () => {
      const newLikes = parseInt(toyLikes.textContent) + 1;
      toyLikes.textContent = newLikes + " Likes";
      fetch(`http://localhost:3000/toys/${singleToy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
           Accept: "application/json"},
        body: JSON.stringify({
          likes: parseInt(newLikes)
        })
      })

    })
    toyDiv.append(toyName, toyImage, toyLikes, likeButton)
    document.getElementById('toy-collection').append(toyDiv);
}


const toyForm = document.querySelector(".add-toy-form")

function add(e) {
  e.preventDefault()

  const newToyName = e.target.name.value
  const newToyImage = e.target.image.value

  const newToy = {
    "name" : newToyName,
    "image" : newToyImage,
    "likes" : 0
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)    
  })
    .then(res => res.json())
    .then((addedToy) => renderToys(addedToy)) 
}

toyForm.addEventListener('submit', add)