        // Store the original HTML content of the searchable area
        let originalContentHTML = '';
        const contentAreaId = 'body'; // ID of the div containing the content to be searched

        /**
         * Initializes the script when the DOM is fully loaded.
         * Stores the original content and attaches event listeners.
         */
        document.addEventListener('DOMContentLoaded', () => {
            const contentElement = document.getElementById(contentAreaId);
            if (contentElement) {
                originalContentHTML = contentElement.innerHTML;
            } else {
                console.error(`Error: Element with ID '${contentAreaId}' not found. Highlighting will not work.`);
                return;
            }

            // Attach event listener to the search button
            document.getElementById('searchButton').addEventListener('click', highlightWords);

            // Attach event listener to the search input for 'Enter' key press
            document.getElementById('searchInput').addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    highlightWords();
                }
            });
        });

        /**
         * Highlights all occurrences of the search term within the specified content area.
         */
        function highlightWords() {
            const searchTerm = document.getElementById('searchInput').value.trim();
            const contentElement = document.getElementById(contentAreaId);

            // Restore original content before a new search to clear previous highlights
            if (contentElement) {
                contentElement.innerHTML = originalContentHTML;
            } else {
                return; // Should not happen if DOMContentLoaded check passed
            }

            // If search term is empty, just restore and return
            if (searchTerm === '') {
                return;
            }

            // Create a case-insensitive regular expression for the search term
            // Escape special characters in the search term to treat it as a literal string
            const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedSearchTerm})`, 'gi'); // 'g' for global, 'i' for case-insensitive

            /**
             * Recursively traverses the DOM to find and highlight text nodes.
             * @param {Node} node - The current DOM node to process.
             */
            function processNode(node) {
                // Process text nodes
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.nodeValue;
                    
                    // Check if the text node contains the search term
                    if (regex.test(text)) {
                        const fragment = document.createDocumentFragment();
                        let lastIndex = 0;
                        let match;
                        
                        // Reset regex.lastIndex for each new text node
                        regex.lastIndex = 0;

                        while ((match = regex.exec(text)) !== null) {
                            // Append the text before the match
                            fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));

                            // Create a span for the highlighted text
                            const span = document.createElement('span');
                            span.className = 'highlight';
                            span.textContent = match[0];
                            fragment.appendChild(span);

                            lastIndex = regex.lastIndex;
                        }
                        // Append any remaining text after the last match
                        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));

                        // Replace the original text node with the fragment
                        node.parentNode.replaceChild(fragment, node);
                    }
                }
                // Recursively process child elements, skipping script and style tags
                else if (node.nodeType === Node.ELEMENT_NODE && 
                           node.tagName !== 'SCRIPT' && 
                           node.tagName !== 'STYLE' &&
                           node.tagName !== 'INPUT' &&
                           node.tagName !== 'BUTTON') { // Exclude input and button elements from being searched
                    // Create a static copy of childNodes to avoid issues during DOM modification
                    const children = Array.from(node.childNodes);
                    for (let i = 0; i < children.length; i++) {
                        processNode(children[i]);
                    }
                }
            }

            // Start processing from the main content area
            if (contentElement) {
                processNode(contentElement);
            }
        }
    </script>
