/**
 * Hierarchy Builder Service
 * 
 * Rules:
 * - Multiple independent trees possible
 * - Root = node never appears as child
 * - Uses adjacency list
 * - Optimized for up to 50 nodes
 * 
 * @param {string[]} edges - Array of valid edges (e.g. ["A->B", "A->C"])
 * @returns {Object} JSON hierarchy tree representation
 */

const { removeDiamondStructures } = require('../utils/diamond.util');
const { detectCycleDFS } = require('../utils/cycle.util');
const { calculateDepthDFS } = require('../utils/depth.util');

const buildHierarchy = (edges) => {
    if (!edges || edges.length === 0) {
        return {
            tree: {},
            has_cycle: false,
            depth: 0
        };
    }

    // Filter out diamond structures (first parent wins)
    const filteredEdges = removeDiamondStructures(edges);

    const adjacencyList = {};
    const childrenSet = new Set();
    const allNodes = new Set();

    // 1. Build adjacency list and record nodes
    for (let i = 0; i < filteredEdges.length; i++) {
        const parts = filteredEdges[i].split('->');
        const parent = parts[0];
        const child = parts[1];

        if (!adjacencyList[parent]) {
            adjacencyList[parent] = [];
        }
        adjacencyList[parent].push(child);

        childrenSet.add(child);
        allNodes.add(parent);
        allNodes.add(child);
    }

    // 2. Identify root nodes (nodes that are never children)
    const roots = [];
    allNodes.forEach(node => {
        if (!childrenSet.has(node)) {
            roots.push(node);
        }
    });

    // 3. Cycle Detection
    if (detectCycleDFS(adjacencyList, allNodes)) {
        let cycleRoot = null;

        // If all nodes appear as children and no valid root exists:
        // Choose lexicographically smallest node
        if (roots.length === 0 && allNodes.size > 0) {
            cycleRoot = Array.from(allNodes).sort()[0];
        } else if (roots.length > 0) {
            cycleRoot = roots.sort()[0];
        }

        return {
            root: cycleRoot,
            tree: {},
            has_cycle: true
        };
    }

    // 4. Build tree recursively
    const constructTree = (node) => {
        const tree = {};
        const children = adjacencyList[node];
        
        if (children) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                tree[child] = constructTree(child);
            }
        }
        
        return tree;
    };

    // 5. Construct final output for all roots
    const hierarchyTree = {};
    for (let i = 0; i < roots.length; i++) {
        const root = roots[i];
        hierarchyTree[root] = constructTree(root);
    }

    // Calculate Depth for non-cyclic graphs
    const depth = calculateDepthDFS(adjacencyList, roots);

    return {
        tree: hierarchyTree,
        depth: depth,
        has_cycle: false
    };
};

module.exports = {
    buildHierarchy
};
