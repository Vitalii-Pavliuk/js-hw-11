export const createPictures = {
    createPicturesList: (data) => {
      return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
          <div class="photo-card">
            <a href="${largeImageURL}" class="gallery__item">
              <img
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
                width="300"
                height="200"
              />
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${downloads}</b>
              </p>
            </div>
          </div>
        `;
      }).join("");
    }
  };
  