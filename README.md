**NAME**<br>
automata - a multiplayer game where cellular automata compete for supremacy. Only 1 automata can be controlled from a single URL. To control more than 1 color yourself connect to the board from another tab.

**WIN CONDITION**<br>
You win when your automata occupies at least 80% of the board.

**THE CATCH**<br>
If any 2 different colored automata collide every cell connected to the collision by association dies.

**DESCRIPTION**<br>
The only way to interact with your automata is by defining Survival/Birth (S/B) conditions in the input field beneath the game grid.

*S* - consists of a list of numbers, each of which represent how many living neighbors are necessary for a living cell to survive<br>
*B* - consists of a list of numbers, each of which represent how many living neighbors are necessary for a dead cell to be born

**USAGE**<br>
`$ /[1-9]*\/[1-9]*/`

**EXAMPLES**
```sh
$ 124/14
$ /123
$ 1356/
```

**FIG 1.**
```
0 | 1 | 0
--+---+--
0 | c | 1
--+---+--
0 | 0 | 1
```

If we apply the S/B rule 134/25 to the cell depicted in FIG 1. we see that there are 3 living neighbors.

We can deduce that if c is living (c=1) then it will survive b/c rule S includes a 3.
However, if c is dead (c=0) then it will stay dead b/c rule B does not include a 3.

**FURTHER READING**<br>
Google "Life-like cellular automaton" for more information.

**AUTHOR**<br>
Jake Wood

**LICENCE**<br>
This project is licensed under the terms of the MIT license.
