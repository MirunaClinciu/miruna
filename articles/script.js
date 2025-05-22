document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const chapters = document.querySelectorAll('.chapter-content');

  chapters.forEach(chapter => {
    const text = chapter.textContent.toLowerCase();
    if (text.includes(query)) {
      chapter.style.display = 'block';
      highlightText(chapter, query);
    } else {
      chapter.style.display = 'none';
    }
  });
});

function highlightText(chapter, query) {
  const innerHTML = chapter.innerHTML;
  const index = innerHTML.toLowerCase().indexOf(query);
  if (index >= 0) {
    chapter.innerHTML = innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + query.length) +
      "</span>" +
      innerHTML.substring(index + query.length);
  }
}

