import Notiflix from "notiflix";
import { picturesApiService } from "./fetchPictures";
import { createPictures } from "./createPictures";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  searchInput: document.querySelector("#search-form"),
  searchResult: document.querySelector(".gallery"),
  searchButton: document.querySelector(".form-button"),
  loadMoreButton: document.querySelector(".load-more"),
};

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: 'alt',
    captionDelay: 250,
    close: true
  });

refs.searchInput.addEventListener("submit", onSubmit);
refs.loadMoreButton.addEventListener("click", onLoadMore);

async function onSubmit(event) {
    event.preventDefault();

    const inputValue = event.target.querySelector("input").value.trim();

    if (!inputValue) {
        clearPictures();
        return;
    }

    picturesApiService.setQuery(inputValue);

    try {
        const data = await picturesApiService.fetchPictures();

        if (!data.hits.length) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }

        if (data.totalHits > 40) {
        refs.loadMoreButton.classList.remove("is-hidden");
        }

        refs.searchResult.innerHTML = createPictures.createPicturesList(data.hits);
        lightbox.refresh();
    } catch (error) {
        Notiflix.Notify.failure("Oops, something went wrong. Try again later.");
        console.error("Error:", error);
    }
};

async function onLoadMore() {
    const data = await picturesApiService.fetchPictures();
    refs.searchResult.innerHTML = createPictures.createPicturesList(data.hits);
};

function clearPictures() {
  refs.searchResult.innerHTML = "";
}

