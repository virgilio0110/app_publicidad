const ads = Array.from({ length: 50 }, (_, i) => ({
    title: `Publicidad ${i + 1}`,
    description: `Esta es la descripción del anuncio ${i + 1}.`,
    category: i % 2 === 0 ? "Tecnología" : "Deportes"
}));

const container = document.getElementById("ads-container");
const filter = document.getElementById("filter");

let adsLoaded = 0; // Controla cuántos anuncios se han cargado

function loadMoreAds(category = "") {
    // Filtra y carga solo los anuncios pendientes
    const filteredAds = ads
        .filter(ad => !category || ad.category === category)
        .slice(adsLoaded, adsLoaded + 5); // Carga 5 anuncios más

    filteredAds.forEach(ad => {
        const adElement = document.createElement("div");
        adElement.className = "ad";
        adElement.innerHTML = `<h3>${ad.title}</h3><p>${ad.description}</p>`;
        container.appendChild(adElement);
    });

    adsLoaded += filteredAds.length; // Incrementa el contador de anuncios cargados
}

filter.addEventListener("change", event => {
    // Reinicia los anuncios cargados al cambiar de categoría
    adsLoaded = 0;
    container.innerHTML = ""; // Limpia los anuncios actuales
    loadMoreAds(event.target.value);
});

// Inicialmente carga los primeros anuncios
loadMoreAds();

// Detectar scroll para cargar más anuncios
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreAds(filter.value); // Carga anuncios según la categoría seleccionada
    }
});
