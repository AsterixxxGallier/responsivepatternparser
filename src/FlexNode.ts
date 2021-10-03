class FlexNode {
    /**
     * Name of this node. In the future, this field will be replaced.
     */
    name: string
    /**
     * A list of links that have {@link this} as {@link FlexLink.previous}
     */
    linksStartingHere: FlexLink[] = []
    /**
     * A list of links that have {@link this} as {@link FlexLink.next}
     */
    linksEndingHere: FlexLink[] = []

    constructor(name: string) {
        this.name = name;
    }
}