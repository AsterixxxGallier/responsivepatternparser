```
 ______,  0#2
 __, __,  0#1
 , , , ,  0#0
A B C D E
^ ^ ^ ^ ^ 0 first = A; last = E

 ________,  0#2
 ____, __,  0#1
 __, , , ,  0#0
 , ,        1#0
A X B C D E
^   ^ ^ ^ ^ 0 first = A; last = E
  ^         1 parent = A.->.E; first = X; last = X; previous: A; next = B

 __________,  0#2
 ______, __,  0#1
 ____, , , ,  0#0
 __,          1#1
 , , ,        1#0
A X Y B C D E
^     ^ ^ ^ ^ 0 first = A; last = E
  ^ ^         1 parent = A.->.E; first = X; last = Y; previous: A; next = B


Structure {
    first: Node
    last: Node
    previous: Node?
    next: Node?
    
    init {
        parent.link(last, next)
    }
    
    append(node: Node, distance: number) {
        linkToNext = unlink(last, next)
        link(last, node, distance)
        addShortcutLinks()
        last = node
        link(last, next, linkToN)
    }
    
    link(a: Node, b: Node, degree: number, distance: number) {
        link = Link(this, a, b, degree, distance)
        a.linksFromHere.add(link)
        b.linksToHere.add(link)
    }
    
    unlink(a: Node, b: Node) {
        a.linksFromHere.removeWhere(link.a = a & link.b = b)
        b.linksToHere.removeWhere(link.a = a & link.b = b)
    }
    
    splice(link: Link, node: Node, distanceFromPrevious: number) {
        require(link.degree == 0)
        structure = Structure(this, node, node, link.previous, link.next)
    }
}
```