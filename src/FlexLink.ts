class FlexLink {
    previous: FlexNode
    next: FlexNode
    distance: FlexNode

    constructor(previous: FlexNode, next: FlexNode, distance: FlexNode) {
        this.previous = previous;
        this.next = next;
        this.distance = distance;
    }
}