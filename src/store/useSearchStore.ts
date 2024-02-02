import { defineStore } from "pinia";
import { ref } from "vue";
import useAxios from "@hooks/useAxios";

const { get } = useAxios();

const useSearchStore = defineStore("searchStore", {
  state: () => {
    const keyword = ref("");
    const serarchResDatas = ref([]);
    const isLoading = ref(true);
    return {
      keyword,
      serarchResDatas,
      isLoading,
    };
  },

  actions: {
    setKeyword(keyword: string) {
      this.keyword = keyword;
    },
    async getSearchResData(
      isByClick: boolean,
      routeIndex?: number,
      episodeIndex?: number,
      perPageNum?: number,
      page?: number,
    ) {
      if (this.keyword) {
        this.isLoading = true;
        this.serarchResDatas = await get(
          `/search?keyword=${this.keyword}&isByClick=${isByClick}&routeIndex=${routeIndex}&perPageNum=${perPageNum}&page=${page}&episodeIndex=${episodeIndex}`,
        );
        console.log(this.serarchResDatas);

        this.isLoading = false;
        this.keyword = "";
      }
    },
  },
});

export default useSearchStore;
