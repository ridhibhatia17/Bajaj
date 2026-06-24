/**
 * Utility to calculate the depth of a tree/forest using recursive DFS.
 * Depth is defined as the number of nodes in the longest root-to-leaf path.
 * 
 * @param {Object} adjacencyList - The adjacency list of the graph
 * @param {string[]} roots - The root nodes of the independent trees
 * @returns {number} The maximum depth found
 */
const calculateDepthDFS = (adjacencyList, roots) => {
    if (!roots || roots.length === 0) {
        return 0; // Empty graph has 0 depth
    }

    const getDepth = (node) => {
        const children = adjacencyList[node];
        
        // If node has no children, it's a leaf node. Counts as 1.
        if (!children || children.length === 0) {
            return 1; 
        }
        
        // Find max depth of all children
        let maxChildDepth = 0;
        for (let i = 0; i < children.length; i++) {
            maxChildDepth = Math.max(maxChildDepth, getDepth(children[i]));
        }
        
        return 1 + maxChildDepth;
    };

    // Calculate max depth across all independent trees
    let maxDepth = 0;
    for (let i = 0; i < roots.length; i++) {
        maxDepth = Math.max(maxDepth, getDepth(roots[i]));
    }

    return maxDepth;
};

module.exports = {
    calculateDepthDFS
};
