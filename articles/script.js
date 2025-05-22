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
         * 2. Finds all occurrences of the search term (case-insensitive).
         * 3. Wraps each found term in a <span> with 'highlight' class.
         * 4. Stores highlighted elements and updates the search results count.
         * 5. Jumps to the first highlighted occurrence if any are found.
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
            const regex = new RegExp(searchTerm, 'gi'); // 'g' for global, 'i' for case-insensitive

            /**
             * Recursively traverses the DOM to find and highlight text nodes.
             * It avoids modifying script, style, input, button, and textarea elements.
             * @param {Node} node - The current DOM node to process.
             */
            function highlightTextNodes(node) {
                // Process text nodes
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.nodeValue;
                    // IMPORTANT: Reset regex lastIndex for this text node to ensure all matches are found
                    regex.lastIndex = 0; 
                    
                    let matchesFound = false; // Flag to check if any matches were found in this text node
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;
                    let match;

                    // Iterate through all matches in the text node
                    while ((match = regex.exec(text)) !== null) {
                        matchesFound = true; // Mark that a match was found
                        // Append the text before the current match
                        fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));

                        // Create a span element for the highlighted text
                        const span = document.createElement('span');
                        span.className = 'highlight'; // Add the highlight class
                        span.textContent = match[0]; // Set the matched text
                        fragment.appendChild(span);
                        highlightedElements.push(span); // Add the span to our array of highlighted elements

                        lastIndex = regex.lastIndex; // Update the last index for the next iteration
                    }

                    // If matches were found, replace the original text node with the fragment
                    if (matchesFound) {
                        // Append any remaining text after the last match
                        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
                        node.parentNode.replaceChild(fragment, node);
                    }
                }
                // Process element nodes, but skip certain tags (and the search container itself)
                else if (node.nodeType === Node.ELEMENT_NODE &&
                           node.tagName !== 'SCRIPT' &&
                           node.tagName !== 'STYLE' &&
                           node.tagName !== 'INPUT' &&
                           node.tagName !== 'BUTTON' &&
                           node.tagName !== 'TEXTAREA' &&
                           node.id !== 'search-container') { // Exclude the search container from being modified
                    // Recursively call highlightTextNodes for each child node
                    // Create a shallow copy of childNodes because node.childNodes is a live collection
                    // and can change during replacement, leading to skipped nodes.
                    const children = Array.from(node.childNodes);
                    for (let i = 0; i < children.length; i++) {
                        highlightTextNodes(children[i]);
                    }
                }
            }

            // Start highlighting from the content area element
            if (contentAreaElement) {
                highlightTextNodes(contentAreaElement);
            }

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