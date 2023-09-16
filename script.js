const pokemonImage = document.querySelector('.pokemon__image')
const typePokemon = document.querySelector('.types__pokemons')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonName = document.querySelector('.pokemon__name')
const inputSearch = document.querySelector('.input__search')
const femaleMale = document.querySelector('.male')

let pokemonID = 1
let isFemale = true

const typeImages = {
    normal: './images/types/TeraGem_Normal.png',
    poison: './images/types/TeraGem_Poison.png',
    psychic: './images/types/TeraGem_Psychic.png',
    rock: './images/types/TeraGem_Rock.png',
    steel: './images/types/TeraGem_Steel.png',
    water: './images/types/TeraGem_Water.png',
    fire: './images/types/TeraGem_Fire.png',
    flying: './images/types/TeraGem_Flying.png',
    grass: './images/types/TeraGem_Grass.png',
    ground: './images/types/TeraGem_Ground.png',
    ghost: './images/types/TeraGem_Ghost.png',
    ice: './images/types/TeraGem_Ice.png',
    bug: './images/types/TeraGem_Bug.png',
    dark: './images/types/TeraGem_Dark.png',
    dragon: './images/types/TeraGem_Dragon.png',
    electric: './images/types/TeraGem_Electric.png',
    fairy: './images/types/TeraGem_Fairy.png',
    fighting: './images/types/TeraGem_Fighting.png'
}

const typeNames = {
    normal: 'Normal',
    poison: 'Poison',
    psychic: 'Psychic',
    rock: 'Rock',
    steel: 'Steel',
    water: 'Water',
    fire: 'Fire',
    flying: 'Flying',
    grass: 'Grass',
    ground: 'Ground',
    ice: 'Ice',
    bug: 'Bug',
    dark: 'Dark',
    dragon: 'Dragon',
    electric: 'Electric',
    fairy: 'Fairy',
    fighting: 'Fighting'
}

const createTypePokemon = (pokemons) => {
    typePokemon.innerHTML = ''
    pokemons.forEach(pokemon => {
        const img = document.createElement('img')
        img.classList.add('pokemon__type')
        img.src = typeImages[pokemon]
        img.title = typeNames[pokemon]
        typePokemon.appendChild(img)
    });

}

const toggleSex = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    const female = data.sprites.versions['generation-v']['black-white'].animated.front_female
    const male = data.sprites.versions['generation-v']['black-white'].animated.front_default

    if (data) {
        if (isFemale) {
            pokemonImage.src = female;
        } else {
            pokemonImage.src = male
        }
        isFemale != isFemale
        if (isFemale) {
            femaleMale.src = './images/female.png'
            isFemale = false
        } else {
            femaleMale.src = './images/male.png'
            isFemale = true
        }
        return data;
    } else {
        console.log('Pokemon não encontrado');
        return null;
    }
}

const fetchPokemon = async (pokemon) => {
    try {
        const APIpokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await APIpokemon.json()
        return data
    } catch (error) {
        console.log('Pokemon não encontrado')
        return null
    }
}

const renderPokemon = async (pokemon) => {
    pokemonImage.src = ''
    femaleMale.style.display = 'none'
    typePokemon.innerHTML = ''
    pokemonNumber.innerText = ''
    pokemonName.innerText = 'Loading...'

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default
        femaleMale.src = './images/male.png'
        typePokemon.innerHTML = ''
        pokemonNumber.innerText = data.id
        pokemonID = data.id
        pokemonName.innerText = data.name
        if (data.sprites.versions['generation-v']['black-white'].animated.front_female) {
            femaleMale.style.display = 'block'
        } else {
            femaleMale.style.display = 'none'
        }
        if (data.types.length === 1) {
            const pokemonType1 = data.types[0].type.name
            createTypePokemon([pokemonType1])
        } else if (data.types.length === 2) {
            const pokemonType1 = data.types[0].type.name
            const pokemonType2 = data.types[1].type.name
            createTypePokemon([pokemonType1, pokemonType2])
        }
    } else {
        pokemonImage.src = './images/pikachu404.png'
        typePokemon.innerHTML = ''
        pokemonNumber.innerText = ''
        pokemonName.innerText = 'Not Found :/'
    }
}

const searchPokemon = (e) => {
    e.preventDefault()

    renderPokemon(inputSearch.value)
    inputSearch.value = ''
}

const prevPokemon = () => {
    if (pokemonID > 1) {
        pokemonID -= 1
        renderPokemon(pokemonID)
    }
}

const nextPokemon = () => {
    pokemonID += 1
    renderPokemon(pokemonID)
}

renderPokemon(pokemonID)