import java.util.*;

class AStarNode implements Comparable<AStarNode> {
    int x, y; // coordinates of the node
    int gCost; // cost from start node to current node
    int hCost; // heuristic cost from current node to goal node
    int fCost; // total cost (gCost + hCost)
    AStarNode parent; // previous node in the path
    
    public AStarNode(int x, int y) {
        this.x = x;
        this.y = y;
        gCost = 0;
        hCost = 0;
        fCost = 0;
        parent = null;
    }

    @Override
    public int compareTo(AStarNode other) {
        return Integer.compare(this.fCost, other.fCost);
    }
}
