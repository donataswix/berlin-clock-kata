# Berlin Clock Kata

## Complementary material

Link to the presentation <https://dop.github.io/pages/berlin-clock-kata.html>.

## Instructions

Install dependencies:

```
yarn install
```

Start the practice:

```
yarn watch
```

`watch` script will check the output of `src/kata.mjs` against `data/gold.txt`.

## Explanation of the output

First output looks like this:

```
00:00:00 => . .... .... ........... .... ✓
00:00:01 => . .... .... ........... .... ×
23:59:59 => . .... .... ........... .... ×
18:48:02 => . .... .... ........... .... ×
```

Each line starts with row from `data/input.txt`, which is followed by arrow `=>`, which in turn is followed by the result of `toBerlinClock` function from `src/kata.mjs`. Line ends with one of these symbols:

- ✓ indicates that the same line was found in `data/gold.txt`,
- × means that time was matched, but result differs,
- ? means that time was not found.
