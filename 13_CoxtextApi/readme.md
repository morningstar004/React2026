## state management

In react when we a need to assing a prop to component and the component is to deep inside the other component and just to reach the component we need to pass the prop to each parant component which is not accessing the prop ,,
```
Prop Drilling : Passing the data (props) through multiple layers of components, from a parent component to a deeply nested child component.
```

The problem was if several components are nested inside each other and if we wanted to use a variable inside that component , then that variable or state should be available in its nearest parent component, so if suppose 5 components are nested from top to bottom , then first we needed to pass that variable as a prop to all the top 4 components so that we can get the variables as a prop in the bottom most component , this was a lengthy process to eliminate this method react introduced ***contextAPI*** , so that we can create a global variable or context which can directly be used by any level component directly.

To manage the state of such prop react uses React-redux or redux-Toolkit(RTX) by redux.

There are some other kit that help managing state : Zustand is one of them.
