const { removeDiamondStructures } = require('../utils/diamond.util');
const { detectCycleDFS } = require('../utils/cycle.util');
const { calculateDepthDFS } = require('../utils/depth.util');

/**
 * Summary Generator Service
 * 
 * Generates an analytical summary of the graph structure.
 * 
 * @param {string[]} edges - Array of valid edge strings
 * @returns {Object} Summary containing total_trees, total_cycles, and largest_tree_root
 */
const generateSummary = (edges) => {
    if (!edges || edges.length === 0) {
        return {
            total_trees: 0,
            total_cycles: 0,
            largest_tree_root: null
        };
    }

    // Filter out diamond structures (first parent wins)
    const filteredEdges = removeDiamondStructures(edges);

    const undirectedAdjList = {};
    const directedAdjList = {};
    const allNodes = new Set();
    const childrenSet = new Set();

    // 1. Build adjacency lists and record nodes
    for (let i = 0; i < filteredEdges.length; i++) {
        const parts = filteredEdges[i].split('->');
        const parent = parts[0];
        const child = parts[1];

        // Undirected for Weakly Connected Components (WCC)
        if (!undirectedAdjList[parent]) undirectedAdjList[parent] = [];
        if (!undirectedAdjList[child]) undirectedAdjList[child] = [];
        undirectedAdjList[parent].push(child);
        undirectedAdjList[child].push(parent);

        // Directed for depth and cycle calculation
        if (!directedAdjList[parent]) directedAdjList[parent] = [];
        directedAdjList[parent].push(child);

        childrenSet.add(child);
        allNodes.add(parent);
        allNodes.add(child);
    }

    // 2. Identify Weakly Connected Components (WCCs)
    const visitedNodes = new Set();
    const wccs = [];

    allNodes.forEach(node => {
        if (!visitedNodes.has(node)) {
            const componentNodes = new Set();
            const queue = [node];
            visitedNodes.add(node);

            while (queue.length > 0) {
                const curr = queue.shift();
                componentNodes.add(curr);

                const neighbors = undirectedAdjList[curr] || [];
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    if (!visitedNodes.has(neighbor)) {
                        visitedNodes.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
            wccs.push(componentNodes);
        }
    });

    let total_trees = 0;
    let total_cycles = 0;
    let largest_tree_root = null;
    let max_depth = 0;

    // 3. Analyze each WCC independently
    wccs.forEach(component => {
        const hasCycle = detectCycleDFS(directedAdjList, component);
        
        if (hasCycle) {
            total_cycles++;
        } else {
            total_trees++;
            
            // Find root of this specific tree component
            let compRoot = null;
            for (const node of component) {
                if (!childrenSet.has(node)) {
                    compRoot = node;
                    break; // Guaranteed exactly 1 root per acyclic diamond-free WCC
                }
            }

            if (compRoot) {
                const depth = calculateDepthDFS(directedAdjList, [compRoot]);
                
                // Track largest tree root with lexicographical tie-breaker
                if (depth > max_depth) {
                    max_depth = depth;
                    largest_tree_root = compRoot;
                } else if (depth === max_depth) {
                    if (largest_tree_root === null || compRoot < largest_tree_root) {
                        largest_tree_root = compRoot;
                    }
                }
            }
        }
    });

    return {
        total_trees,
        total_cycles,
        largest_tree_root
    };
};

module.exports = {
    generateSummary
};
