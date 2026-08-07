# Counter with Classic JavaScript

This project is a small counter built with plain HTML, CSS, and JavaScript—no framework or build tool is required. It is useful for learning what happens behind the scenes before using a library such as React.

## What this app does

The page starts at `0`. Clicking `+` increases the number, and clicking `-` decreases it.

Although it is small, this is the same basic interaction used for many real features:

- selecting the number of tickets to buy;
- adding or removing items from a cart;
- changing a game's score; or
- adjusting the number of guests in a booking form.

## The three parts of the page

| File | Responsibility |
| --- | --- |
| `index.html` | Creates the buttons and the place where the number is displayed. |
| `style.css` | Controls the visual appearance of the counter. |
| `script.js` | Responds to clicks, changes the data, and updates the page. |

## The source of truth: `count`

In `script.js`, the variable below stores the current number:

```js
let count = 0;
```

Treat `count` as the score written in the referee's notebook. The heading on the screen is only a display of that score. Change the notebook first, then update the display.

```js
count += 1;
counterValue.textContent = count;
```

The first line changes the data. The second line makes the browser show that new data.

## From a click to an updated number

The increment button is selected from the page and given a click listener:

```js
const incrementBtn = document.getElementById('increment');

incrementBtn.addEventListener('click', function () {
  count += 1;
  counterValue.textContent = count;
});
```

Read this as: “When the user clicks the element whose id is `increment`, add one to `count`, then put the result into the counter heading.”

The decrement button follows the same pattern, but subtracts one:

```js
count -= 1;
counterValue.textContent = count;
```

## DOM manipulation

**DOM** stands for *Document Object Model*. It is the browser's JavaScript representation of the HTML page. `document.getElementById('counterValue')` gives JavaScript access to this element:

```html
<h2 id="counterValue">0</h2>
```

After that, `counterValue.textContent = count` directly changes what the user sees. This is called **DOM manipulation**.

Imagine a restaurant's order screen. In a classic JavaScript app, you personally replace every number that changes. In a larger React app, you update the order data and React updates the relevant parts of the screen for you.

## Classic JavaScript compared with the React version

| Aspect | `05_counterClassic` | `04_counterVite` |
| --- | --- | --- |
| Data storage | A regular variable: `let count = 0` | React state: `useState(7)` |
| UI update | Manually set `textContent` | React re-renders when state changes |
| Event syntax | `addEventListener('click', ...)` | `onClick={...}` |
| Setup | Open `index.html` in a browser | Run with Vite and npm |
| Best lesson | How the browser DOM works | How React keeps data and UI in sync |

Neither approach is “magic.” React builds on the same browser ideas, but it reduces repetitive manual DOM updates as an application becomes more complex.

## Try it yourself

1. Add a **Reset** button that sets `count` back to `0`.
2. Stop the count from going below `0`.
3. Change the displayed message when the count reaches `10`.
4. Add a second counter and notice that each one needs its own data and DOM references.

The key takeaway is simple: **store the current value, listen for an event, update the value, then update the UI**.
