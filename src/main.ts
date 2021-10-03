import {FlexNode} from "./FlexNode";
import {FlexLink} from "@App/FlexLink";

const a = new FlexNode("A")
const b = new FlexNode("B")
const c = new FlexNode("C")
const d = new FlexNode("D")
const e = new FlexNode("E")
const f = new FlexNode("F")
const g = new FlexNode("G")
const h = new FlexNode("H")
const i = new FlexNode("I")

// add B
const ab = FlexLink.link(a, b, 1, 0)

// add C
const bc = FlexLink.link(b, c, 1, 0)
const ac = FlexLink.link(a, c, 2, 1)

// add D
const cd = FlexLink.link(c, d, 1, 0)

// add E
const de = FlexLink.link(d, e, 1, 0)
const ce = FlexLink.link(c, e, 2, 1)
const ae = FlexLink.link(a, e, 4, 2)

// add F
const ef = FlexLink.link(e, f, 1, 0)

// add G
const fg = FlexLink.link(f, g, 1, 0)
const eg = FlexLink.link(e, g, 2, 1)

// add H
const gh = FlexLink.link(g, h, 1, 0)

// add I
const hi = FlexLink.link(h, i, 1, 0)
const gi = FlexLink.link(g, i, 2, 1)
const ei = FlexLink.link(e, i, 4, 2)
const ai = FlexLink.link(a, i, 8, 3)
