export function FilteredByCategories(categori, AllQuestions) {
  var filteredQuestions = AllQuestions.filter((e) => e.kategori === categori);
  return filteredQuestions;
}
