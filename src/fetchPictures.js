import axios from "axios";

export const picturesApiService = {
  API_KEY: "49427199-340d285b856a5a74b3eae3579",
  searchQuery: "",
  page: 1,

  async fetchPictures() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      const pictures = response.data;
      this.page += 1;
      return pictures;
    } catch (error) {
      console.error("Error fetching pictures:", error);
      console.log(hits)
      return { hits: [] };
    }
  },

  setQuery(newQuery) {
    this.searchQuery = newQuery;
    this.page = 1;
  },

  resetPage() {
    this.page = 1;
  }
};
