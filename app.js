// Create Dino ConstructorDinoConstructor
function dinoConstructor(dino) {
  this.species = dino.species
  this.weight = Number(dino.weight)
  this.height = Number(dino.height)
  this.diet = dino.diet
  this.when = dino.when
  this.where = dino.where
  this.fact = dino.fact
}

// Create Human Constructor
function humanConstructor(name, height, weight, diet) {
  this.species = "human"
  this.name = name
  this.height = Number(height)
  this.weight = Number(weight)
  this.diet = diet
}

// Use IIFE to get human data from form
const getHumanDataForm = (() => {
  const form = document.getElementById("dino-compare")
  form.addEventListener("submit", (event) => { // On button click, prepare and display infographic
    event.preventDefault()
    const nameHuman = document.getElementById("name").value
    const feetHuman = document.getElementById("feet").value
    const inchesHuman = document.getElementById("inches").value
    const weightHuman = document.getElementById("weight").value
    const dietHuman = document.getElementById("diet").value

    const heightInInches = Number(feetHuman) * 12 + Number(inchesHuman)
    const humanFormData = new humanConstructor(nameHuman, heightInInches, weightHuman, dietHuman)

    generateTiles(humanFormData)
  })
})()

// Create Dino Compare weight
dinoConstructor.prototype.compareWeight = function (human) {
  return this.weight > human.weight
    ? `${this.species} heavier than human.`
    : this.weight < human.weight
    ? `Human heavier ${this.species}.`
    : `Human the same as the ${this.species}.`
}

// Create Dino Compare height
dinoConstructor.prototype.compareHeight = function (human) {
  return this.height > human.height
    ? ` ${this.species} taller human.`
    : this.height < human.height
    ? `Human taller the ${this.species}.`
    : `Human the same height as the ${this.species}.`
}

// Create Dino Compare diet
dinoConstructor.prototype.compareDiet = function (human) {
  return this.diet === human.diet
    ? `Human and the ${this.species} same diet.`
    : `Human diet is different from the ${this.species}.`
}


// To generate a random number between 0, 1, 2, 3, 4, and 6
const getRandomNumber = () => {
  const numbers = [0, 1, 2, 3, 4, 5]
  const randomIndex = Math.ceil(Math.random() * numbers.length)
  return numbers[randomIndex]
}

// Generate Grid display with random number
const generateGridDisplay = (dinos, human) => {
  const gridContainer = document.getElementById("grid")
  gridContainer.innerHTML = ""

  const numbers = [0, 1, 2, 3, 4, 5]
  const randomIndex = Math.ceil(Math.random() * numbers.length)
  const getValueRandom = numbers[randomIndex]

  const positionsGrid = [0, 1, 2, 3, 4, 5, 6, 7, getValueRandom]


  for (let i = positionsGrid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positionsGrid[i], positionsGrid[j]] = [positionsGrid[j], positionsGrid[i]];
  }

  for (let i = 0; i < positionsGrid.length; i++) {
    const gridIndex = positionsGrid[i]

    const item = document.createElement("div")
    item.className = "grid-item"

    if (gridIndex === 4) {
      item.innerHTML = `
            <h3>${human.name}</h3>
            <img src="images/human.png" alt="human">
        `
    } else if (gridIndex === 7) {
      item.innerHTML = `
            <h3>${dinos[gridIndex].species}</h3>
            <img src="images/pigeon.png" alt="${dinos[gridIndex].species}">
            <p>All birds are dinosaurs.</p>
        `
    } else {
      let fact
      const dinosaur = dinos[gridIndex]

      // Compered methods with random numbers from 1 -> 3
      const randomMethod = Math.ceil(Math.random() * 3)

      if (randomMethod === 1) {
        fact = dinosaur.compareWeight(human)
      } 
      if (randomMethod === 2) {
        fact = dinosaur.compareHeight(human)
      } 
      if (randomMethod === 3) {
        fact = dinosaur.compareDiet(human)
      }

      item.innerHTML = `
            <h3>${dinosaur.species}</h3>
            <img src="images/${dinosaur.species}.png" alt="${dinosaur.species}">
            <p>${fact}</p>
        `
    }

    gridContainer.appendChild(item)
  }
}

// Generate Tiles for each Dino in Array
function generateTiles(human) {
  return fetch("./dino.json")
    .then((res) => res.json())
    .then((data) => {
      const dataArray = data.Dinos.map((value) => new dinoConstructor(value))
      generateGridDisplay(dataArray, human)

      const gridContainer = document.getElementById("grid")
      gridContainer.style.display = "grid"

      // Remove form from screen
      const removeForm = document.getElementById("dino-compare")
      removeForm.style.display = "none"


    })
}
