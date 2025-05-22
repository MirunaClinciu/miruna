document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const targetElement = document.body; // Still targets the entire body

    /**
     * Removes all existing highlights from the content by unwrapping the highlight spans.
     * This preserves the original DOM structure and doesn't remove the script itself.
     */
    function removeHighlights() {
        const highlightedSpans = targetElement.querySelectorAll('.highlight');
        highlightedSpans.forEach(span => {
            const parent = span.parentNode;
            // Move all children of the span directly into its parent
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            // Remove the now empty span
            parent.removeChild(span);
        });
    }

    /**
     * Highlights all occurrences of a given search term within the content.
     * This function now uses a more robust DOM traversal to handle modifications.
     * @param {string} searchTerm - The word or phrase to highlight.
     */
    function highlightText(searchTerm) {
        removeHighlights(); // Always remove previous highlights first

        if (!searchTerm.trim()) {
            return; // Do nothing if search term is empty
        }

        // Create a regular expression for the search term, case-insensitive
        // Escapes special characters in the search term to prevent regex errors
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

        /**
         * Recursively traverses the DOM to find text nodes and apply highlights.
         * Uses a while loop for child traversal to handle dynamic DOM changes.
         * @param {Node} node - The current DOM node to process.
         */
        function traverseAndHighlight(node) {
            // Process text nodes
            if (node.nodeType === Node.TEXT_NODE) {
                const parent = node.parentNode;
                const text = node.nodeValue;

                // Check if the text contains the search term
                if (regex.test(text)) {
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    // Use replace to find all matches and build the new content
                    text.replace(regex, (match, p1, offset) => {
                        // Add text before the current match
                        if (offset > lastIndex) {
                            fragment.appendChild(document.createTextNode(text.substring(lastIndex, offset)));
                        }

                        // Create the highlight span
                        const span = document.createElement('span');
                        span.className = 'highlight';
                        span.textContent = match; // Use textContent for security and simplicity
                        fragment.appendChild(span);

                        lastIndex = offset + match.leng
