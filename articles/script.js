 document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const contentDiv = document.getElementById('content');
            let originalContent = contentDiv.innerHTML; // Store the original content

            /**
             * Removes all existing highlights from the content.
             * This is crucial before applying new highlights to prevent accumulation.
             */
            function removeHighlights() {
                // Restore the original content to remove all highlights
                contentDiv.innerHTML = originalContent;
            }

            /**
             * Highlights all occurrences of a given search term within the content.
             * @param {string} searchTerm - The word or phrase to highlight.
             */
            function highlightText(searchTerm) {
                removeHighlights(); // Always remove previous highlights first

                if (!searchTerm.trim()) {
                    return; // Do nothing if search term is empty
                }

                // Create a regular expression for the search term, case-insensitive
                const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                // The replace function escapes special characters in the search term

                // Use a temporary div to process the content to avoid issues with direct innerHTML manipulation
                // This helps preserve event listeners if they were present (though not in this simple example)
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalContent;

                // Traverse the text nodes and replace matches
                function traverseAndHighlight(node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        const parent = node.parentNode;
                        const text = node.nodeValue;
                        const matches = text.match(regex);

                        if (matches) {
                            const fragment = document.createDocumentFragment();
                            let lastIndex = 0;

                            text.replace(regex, (match, p1, offset) => {
                                // Add text before the match
                                if (offset > lastIndex) {
                                    fragment.appendChild(document.createTextNode(text.substring(lastIndex, offset)));
                                }

                                // Create the highlight span
                                const span = document.createElement('span');
                                span.className = 'highlight';
                                span.textContent = match;
                                fragment.appendChild(span);

                                lastIndex = offset + match.length;
                            });

                            // Add any remaining text after the last match
                            if (lastIndex < text.length) {
                                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
                            }

                            parent.replaceChild(fragment, node);
                        }
                    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                        // Recursively call for child nodes, avoiding script and style tags
                        Array.from(node.childNodes).forEach(traverseAndHighlight);
                    }
                }

                traverseAndHighlight(tempDiv);
                contentDiv.innerHTML = tempDiv.innerHTML; // Update the main content div
            }

            // Event listener for the search button click
            searchButton.addEventListener('click', () => {
                const searchTerm = searchInput.value;
                highlightText(searchTerm);
            });

            // Event listener for pressing Enter key in the search input
            searchInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const searchTerm = searchInput.value;
                    highlightText(searchTerm);
                }
            });

            // Optional: Remove highlights when the search input is cleared
            searchInput.addEventListener('input', () => {
                if (searchInput.value === '') {
                    removeHighlights();
                }
            });
        });
