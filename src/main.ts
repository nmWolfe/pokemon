import "./styles/style.scss";
import pokemonArray from "./data/pokemon";

const cardContainer = document.querySelector(
  ".card-container"
) as HTMLDivElement;

// Dynamically adding Elements
const cardFilter = document.createElement("input");
const cardFilterLabel = document.createElement("label");
cardFilterLabel.innerHTML = "Filter your Pokémons! ";
const displayNumFilter = document.createElement("input");
// Setting element attributes
displayNumFilter.setAttribute("type", "number");
displayNumFilter.setAttribute("min", "0");
// Inserting elements
cardContainer.insertAdjacentElement("beforebegin", cardFilter);
cardFilter.insertAdjacentElement("beforebegin", cardFilterLabel);

// Removed due to bug
// cardFilter.insertAdjacentElement("afterend", displayNumFilter);

const handleDisplay = (cardArr: Pokemon[]) => {
  cardContainer.innerHTML = cardArr
    .map((card) => {
      return `
        <div class="card">
        <img src=${card.sprite} alt=${card.name} class="card__image">
        <div class="card__content">
        <h2 class="card__heading">${
          card.name[0].toUpperCase() + card.name.substring(1)
        }</h2>
        <p class="card__text">
        ${card.name[0].toUpperCase() + card.name.substring(1)} (#${
        card.id
      }) is a ${card.types.join(" & ")} type pokemon.
        </p>
        </div>
        </div>
        `;
    })
    .join("");
};

const handleFilter = (event: Event) => {
  const filterInput = event.target as HTMLInputElement;

  const filteredPokemon = pokemonArray.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(filterInput.value.toLowerCase()) ||
      pokemon.types.join(" ").toLowerCase().includes(filterInput.value) ||
      pokemon.id == Number(filterInput.value)
    );
  });
  handleDisplay(filteredPokemon);
};

// Removed due to bug in display output
// const handleNumFilter = (event: Event) => {
//   const numFilter = event.target as HTMLInputElement;

//   handleDisplay(pokemonArray.slice(0, Number(numFilter.value)));
//   if (!numFilter.value) {
//     handleDisplay(pokemonArray);
//   }
// };

cardFilter.addEventListener("input", handleFilter);
// displayNumFilter.addEventListener("input", handleNumFilter);
handleDisplay(pokemonArray);
