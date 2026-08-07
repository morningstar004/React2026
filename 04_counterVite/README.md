# Counter with React and Vite

This small project demonstrates one of React's most important ideas: **state**. A counter looks simple, but the same pattern is used in shopping carts, like buttons, notification badges, and quantity selectors.

## What this app does

The page starts with a count of `7` and provides two buttons:

- **Increase count** adds `1`.
- **Decrease count** subtracts `1`.

## The main idea: state

In `src/App.jsx`, this line creates a piece of state:

```jsx
const [count, setCount] = useState(7);
```

Read it as: “React, remember a value named `count`. It begins at `7`, and `setCount` is the approved way to change it.”

Think of `count` as the number shown on an electronic scoreboard. `setCount` is the button on the scoreboard's control panel. You do not repaint the number yourself; you send the new value to the scoreboard, and it refreshes its display.

## From a click to a new screen

When the user clicks **Increase count**, this happens:

1. React runs `addValue` because it is attached through `onClick`.
2. `setCount(count + 1)` requests the next value.
3. React renders the component again with the updated `count`.
4. `{count}` inside the heading displays the new number.

```jsx
const addValue = () => {
  setCount(count + 1);
};

<button onClick={addValue}>Increase count</button>
<h2>Counter: {count}</h2>
```

The same pattern appears in a product page. If a shopper chooses one more item, the app updates the quantity; React then updates every place that depends on it, such as the quantity label and the total price.

## Why React is useful here

In plain JavaScript, you normally find an element and update its `textContent` yourself. In React, you describe the desired UI using state:

```jsx
<h2>Counter: {count}</h2>
```

This means: “Always show the current value of `count` here.” React handles the DOM update. As an app grows, this keeps the UI and its data in sync.

## Important vocabulary

| Term | Meaning in this project |
| --- | --- |
| Component | The `App` function that describes part of the page. |
| State | Data that can change over time, such as `count`. |
| `useState` | A React Hook that gives a component state. |
| Setter | The function, `setCount`, used to request a state update. |
| Event handler | A function that runs after an event, such as a button click. |
| Re-render | React runs the component again and updates the screen where needed. |

## A safer update pattern

For one update, `setCount(count + 1)` works. When the next value depends on the previous one, prefer the functional form below. It is especially useful when several updates may be queued together.

```jsx
setCount((previousCount) => previousCount + 1);
```

For example, a “buy 3” button should add three reliably:

```jsx
setCount((previousCount) => previousCount + 3);
```

## Project structure

- `src/main.jsx` mounts React into the HTML element with the id `root`.
- `src/App.jsx` contains the counter component and its state logic.
- `src/App.css` and `src/index.css` style the page.
- `package.json` lists the project scripts and dependencies.

## Run the project

```bash
npm install
npm run dev
```

Open the local address printed by Vite in your browser.

## Try it yourself

1. Change the initial value from `7` to `0`.
2. Prevent the counter from going below zero.
3. Add a **Reset** button that calls `setCount(0)`.
4. Display a message such as “Goal reached!” when the count reaches `10`.

These small changes practice the core React loop: **state changes → React re-renders → the UI reflects the new state**.
