const artistDiv = document.querySelector("#artistDiv");
const allArtistDiv = document.querySelector("#allArtistDiv");

const state = {
    artists: [],
    singleArtist: []
}

window.addEventListener("hashchange", () => {
    
})

function getEventFromHash(){
    const name = window.location.hash.slice(1);
    //console.log(name);

    const oneArtist = state.artists.find((artist) => {
        if(artist.name.includes(name)){
            return artist.name
        }
    })
    state.singleArtist = oneArtist;
    console.log(state)
}

function renderArtistDetails(){
    if(state.singleArtist){
        getSingleArtist();
    }
}

function selectArtist(){
    getEventFromHash();
    renderArtistDetails();
}

async function getSingleArtist(){
    const artistData = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/artists/${state.singleArtist.id}`);
    const singleArtistData = await artistData.json();
    state.singleArtist = singleArtistData;

    artistDiv.innerHTML = `
        <h1>${state.singleArtist.data.name}</h1>
    `
}


async function render(){
    await getArtistList();
    renderArtistList();
    selectArtist();
}

///render list of artists
function renderArtistList(){
    const allArtists = state.artists.map((artist) => {
        return `
            <div> <a href=#${artist.name}> ${artist.name} </a> </div>
        `
    })
    allArtistDiv.innerHTML = allArtists.join("");

}

//get list of artists
async function getArtistList(){
    const info = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/artists");
    const artistData = await info.json();
    state.artists = artistData.data;
}




render();
