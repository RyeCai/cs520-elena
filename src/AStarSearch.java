import java.util.*;


/*  In this example, the grid represents a 2D map where `0` represents an open space and `1` represents a blocked or obstacle. 
    The A* algorithm searches for a path from the start coordinates `(0, 0)` to the goal coordinates `(8, 8)`. 
    The algorithm uses the Manhattan distance heuristic to estimate the distance between nodes.

    The `findPath` method implements the A* search algorithm, and it returns a list of nodes representing the path from the start node to the goal node. 
    If no path is found, it returns an empty list.

    The `main` method demonstrates how to use the A* search algorithm by finding a path in the provided grid and printing the coordinates of the nodes 
    in the path.
*/

public class AStarSearch {
    private static int[][] grid = { 
        { 0, 0, 1, 0, 0, 0, 0, 0, 0 },
        { 0, 0, 1, 0, 0, 0, 0, 0, 0 },
        { 0, 0, 0, 0, 1, 0, 0, 0, 0 },
        { 0, 0, 0, 0, 1, 0, 0, 0, 0 },
        { 0, 0, 1, 1, 1, 0, 0, 0, 0 },
        { 0, 0, 0, 0, 1, 0, 0, 0, 0 },
        { 0, 0, 1, 0, 0, 0, 0, 0, 0 },
        { 0, 0, 1, 0, 0, 0, 0, 0, 0 },
        { 0, 0, 1, 0, 0, 0, 0, 0, 0 }
    };

    private static int[][] directions = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
    
    private static int calculateHCost(int x, int y, int goalX, int goalY) {
        // Manhattan distance heuristic
        return Math.abs(x - goalX) + Math.abs(y - goalY);
    }
    
    private static boolean isValid(int x, int y) {
        // Check if the coordinates are within the grid boundaries and not blocked
        return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] == 0;
    }
    
    private static List<AStarNode> reconstructPath(AStarNode goalNode) {
        // Reconstruct the path from the goal node to the start node
        List<AStarNode> path = new ArrayList<>();
        AStarNode currentNode = goalNode;
        
        while (currentNode != null) {
            path.add(currentNode);
            currentNode = currentNode.parent;
        }
        
        Collections.reverse(path);
        return path;
    }
    
    public static List<AStarNode> findPath(int startX, int startY, int goalX, int goalY) {
        PriorityQueue<AStarNode> openSet = new PriorityQueue<>();
        Set<AStarNode> closedSet = new HashSet<>();
        AStarNode[][] nodes = new AStarNode[grid.length][grid[0].length];
        
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                nodes[i][j] = new AStarNode(i, j);
            }
        }
        AStarNode startNode = nodes[startX][startY];
        AStarNode goalNode = nodes[goalX][goalY];
        
        startNode.gCost = 0;
        startNode.hCost = calculateHCost(startX, startY, goalX, goalY);
        startNode.fCost = startNode.gCost + startNode.hCost;
        
        openSet.add(startNode);
        
        while (!openSet.isEmpty()) {
            AStarNode currentNode = openSet.poll();
            
            if (currentNode == goalNode) {
                return reconstructPath(goalNode);
            }
            
            closedSet.add(currentNode);
            
            for (int[] direction : directions) {
                int newX = currentNode.x + direction[0];
                int newY = currentNode.y + direction[1];
                
                if (isValid(newX, newY)) {
                    AStarNode neighborNode = nodes[newX][newY];
                    
                    if (closedSet.contains(neighborNode)) {
                        continue;
                    }
                    
                    int tentativeGCost = currentNode.gCost + 1;
                    
                    if (tentativeGCost < neighborNode.gCost || !openSet.contains(neighborNode)) {
                        neighborNode.gCost = tentativeGCost;
                        neighborNode.hCost = calculateHCost(newX, newY, goalX, goalY);
                        neighborNode.fCost = neighborNode.gCost + neighborNode.hCost;
                        neighborNode.parent = currentNode;
                        
                        if (!openSet.contains(neighborNode)) {
                            openSet.add(neighborNode);
                        }
                    }
                }
            }
        }
        
        // No path found
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        List<AStarNode> path = findPath(0, 0, 8, 8);
        
        if (!path.isEmpty()) {
            for (AStarNode node : path) {
                System.out.println("(" + node.x + ", " + node.y + ")");
            }
        } else {
            System.out.println("No path found.");
        }
    }
}
    