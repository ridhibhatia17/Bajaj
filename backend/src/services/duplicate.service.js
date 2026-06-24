/**
 * Duplicate Edge Detection Service
 * 
 * Rules:
 * - First occurrence accepted
 * - Subsequent duplicates stored once
 * - Multiple repetitions do not duplicate the duplicate_edges list
 * 
 * @param {string[]} edges - Array of valid edge strings
 * @returns {Object} An object containing the unique edges and duplicate edges
 */

const detectDuplicateEdges = (edges) => {
    if (!Array.isArray(edges)) {
        throw new Error("Input must be an array of edges");
    }

    const uniqueEdges = [];
    const duplicateEdgesSet = new Set();
    const seenEdges = new Set();

    edges.forEach(edge => {
        if (seenEdges.has(edge)) {
            // It's a subsequent occurrence, add to duplicates set
            duplicateEdgesSet.add(edge);
        } else {
            // First occurrence
            seenEdges.add(edge);
            uniqueEdges.push(edge);
        }
    });

    return {
        uniqueEdges,
        duplicateEdges: Array.from(duplicateEdgesSet)
    };
};

module.exports = {
    detectDuplicateEdges
};
