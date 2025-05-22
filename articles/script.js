  // Global variables to manage highlighted elements and current index
        let highlightedElements = [];
        let currentIndex = -1;
        // Stores the initial HTML content of the specific content area
        let originalContentAreaHTML = ''; 

        /**
         * Initializes the search functionality when the DOM is fully loaded.
         * Stores the original content area HTML and attaches event listeners to buttons and the search input.
         */
        document.addEventListener('DOMContentLoaded', () => {
            // Store the original content of the 'content-area' div
            const contentAreaElement = document.getElementById('content-area');
            if (contentAreaElement) {
                originalContentAreaHTML = contentAreaElement.innerHTML;
            } else {
                console.error("Error: 'content-area' element not found. Search functionality may not work.");
                return; // Exit if the content area isn't found
            }

            // Attach event listeners to the search, previous, and next buttons
            document.getElementById('searchButton').addEventListener('click', searchAndMark);
            document.getElementById('nextButton').addEventListener('click', jumpToNext);
            document.getElementById('prevButton').addEventListener('click', jumpToPrevious);

            // Attach event listener to the search input for 'Enter' key press
            document.getElementById('searchInput').addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    searchAndMark(); // Trigger search when Enter is pressed
                }
            });
        });

        /**
         * Performs the search operation:
         * 1. Resets previous highlights and restores original content of the content area.
         * 2. Finds all occurrences of the search term (case-insensitive) using string replacement.
         * 3. Re-inserts the modified HTML into the content area.
         * 4. Collects the newly created highlight elements.
         * 5. Updates the search results count and jumps to the first highlighted occurrence if any are found.
         */
        function searchAndMark() {
            const searchTerm = document.getElementById('searchInput').value.trim();
            const searchResultsDiv = document.getElementById('searchResults');
            const contentAreaElement = document.getElementById('content-area');

            // Reset previous highlights and restore the content area to its original state
            if (contentAreaElement) {
                contentAreaElement.innerHTML = originalContentAreaHTML;
            } else {
                console.error("Error: 'content-area' element not found during search. Cannot reset content.");
                return;
            }
            
            highlightedElements = []; // Clear the array of highlighted elements
            currentIndex = -1; // Reset current index
            searchResultsDiv.textContent = ''; // Clear previous search results message

            // If the search term is empty, do nothing and return
            if (searchTerm === '') {
                return;
            }

            // Create a regular expression for case-insensitive and global search
            // We escape special characters in the search term to treat it as a literal string
            const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedSearchTerm})`, 'gi'); // 'g' for global, 'i' for case-insensitive

            // Perform the highlighting by replacing occurrences in the string HTML
            // This is generally more robust for ensuring HTML is parsed correctly
            let highlightedHTML = originalContentAreaHTML.replace(regex, '<span class="highlight">$&</span>');
            
            // Update the content area with the new highlighted HTML
            contentAreaElement.innerHTML = highlightedHTML;

            // Collect all the newly created highlight elements
            highlightedElements = Array.from(contentAreaElement.querySelectorAll('.highlight'));

            // Update the search results message and jump to the first highlight if found
            if (highlightedElements.length > 0) {
                searchResultsDiv.textContent = `Found ${highlightedElements.length} occurrence(s).`;
                currentIndex = 0; // Set current index to the first highlight
                jumpToCurrentHighlight(); // Jump to and highlight the first occurrence
            } else {
                searchResultsDiv.textContent = 'No occurrences found.';
            }
        }

        /**
         * Jumps to the currently active highlighted element.
         * Removes 'active-highlight' from previous elements and adds it to the current one.
         * Scrolls the active element into view.
         */
        function jumpToCurrentHighlight() {
            // Remove 'active-highlight' class from all previously active elements
            highlightedElements.forEach(el => el.classList.remove('active-highlight'));

            // If there are highlights and the current index is valid
            if (highlightedElements.length > 0 && currentIndex >= 0 && currentIndex < highlightedElements.length) {
                const activeHighlight = highlightedElements[currentIndex];
                activeHighlight.classList.add('active-highlight'); // Add 'active-highlight' to the current one
                // Scroll the active highlight into the center of the view with smooth animation
                activeHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        /**
         * Jumps to the next highlighted occurrence.
         * Loops back to the first if currently at the last occurrence.
         */
        function jumpToNext() {
            if (highlightedElements.length === 0) return; // Do nothing if no highlights

            currentIndex++; // Increment the index
            // If at the end of the list, loop back to the beginning
            if (currentIndex >= highlightedElements.length) {
                currentIndex = 0;
            }
            jumpToCurrentHighlight(); // Jump to the new current highlight
        }

        /**
         * Jumps to the previous highlighted occurrence.
         * Loops back to the last if currently at the first occurrence.
         */
        function jumpToPrevious() {
            if (highlightedElements.length === 0) return; // Do nothing if no highlights

            currentIndex--; // Decrement the index
            // If at the beginning of the list, loop back to the end
            if (currentIndex < 0) {
                currentIndex = highlightedElements.length - 1;
            }
            jumpToCurrentHighlight(); // Jump to the new current highlight
        }
