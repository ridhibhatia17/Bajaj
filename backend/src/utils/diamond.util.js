/**
 * Utility to handle diamond structures in hierarchies.
 * 
 * Rule: 
 * - A child can only have one parent.
 * - The first parent wins.
 * - Subsequent parent-child relations for the same child are discarded silently.
 * 
 * @param {string[]} edges - Array of valid edge strings (e.g. "A->D")
 * @returns {string[]} Array of edges with diamond structures removed
 */
const removeDiamondStructures = (edges) => {
    if (!Array.isArray(edges)) return [];

    const seenChildren = new Set();
    const filteredEdges = [];

    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const child = edge.split('->')[1];

        // If child hasn't been claimed by a parent yet, keep the edge
        if (!seenChildren.has(child)) {
            seenChildren.add(child);
            filteredEdges.push(edge);
        }
    }

    return filteredEdges;
};

module.exports = {
    removeDiamondStructures
};
