import {FlexStructure} from "./FlexStructure";
import {FlexNode} from "./FlexNode";

const a = new FlexNode("A")
const b = new FlexNode("B")
const c = new FlexNode("C")
const d = new FlexNode("D")
const e = new FlexNode("E")
const f = new FlexNode("F")
const g = new FlexNode("G")
const h = new FlexNode("H")
const i = new FlexNode("I")

const structure = new FlexStructure(a)

structure.add(c, 2)
structure.add(b, 1)
structure.add(d, 3)
structure.add(e, 4)
structure.add(i, 8)
structure.add(f, 5)
structure.add(g, 6)
structure.add(h, 7)

console.log(a.toString())
console.log(b.toString())
console.log(c.toString())
console.log(d.toString())
console.log(e.toString())
console.log(f.toString())
console.log(g.toString())
console.log(h.toString())
console.log(i.toString())

/*
 ______________, AI#2
 ____, ________, AI#1
 __, , , ______, AI#0
 , ,             BB#0
           __,   FH#1
         , , , , FH#0
A B C D E F G H I
^   ^ ^ ^       ^ AI
  ^               BB
          ^ ^ ^   FH
*/