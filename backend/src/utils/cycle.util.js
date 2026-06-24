/**
 * Utility to detect cycles in a directed graph using DFS.
 * 
 * @param {Object} adjacencyList - The adjacency list of the graph
 * @param {Set} allNodes - A set of all nodes in the graph
 * @returns {boolean} True if a cycle exists, false otherwise
 */
const detectCycleDFS = (adjacencyList, allNodes) => {
    const visited = new Set();
    const visiting = new Set();

    const dfs = (node) => {
        visiting.add(node);

        const neighbors = adjacencyList[node] || [];
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            
            // If neighbor is currently in the recursion stack, cycle found!
            if (visiting.has(neighbor)) {
                return true;
            }
            
            // If not fully visited, recursively visit
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;
            }
        }

        visiting.delete(node);
        visited.add(node);
        return false;
    };

    // Check every disconnected component
    for (const node of allNodes) {
        if (!visited.has(node)) {
            if (dfs(node)) return true;
        }
    }

    return false;
};

module.exports = {
    detectCycleDFS
};
