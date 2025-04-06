import algoliasearch from "algoliasearch/lite";

export default async function useSearch(
  query,
  hitsPerPage,
  filters,
  tagFilters
) {
  const algoliaClient = algoliasearch(
    "FKYFNWBQW2",
    "7f6c89772171e482cc7a9c7686b999a5"
  );
  const algoliaIndex = algoliaClient.initIndex("mvdbgames");

  try {
    const { hits, nbHits } = await algoliaIndex.search(query, {
      hitsPerPage: hitsPerPage,
      filters: filters || "",
      tagFilters: tagFilters || "",
    });

    return { hits, nbHits };
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
