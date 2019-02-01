import { h, render } from "preact";
import TodoList from "./todo/TodoList";

window.console.clear = () => undefined;
const App = () => (<div class="body full"><TodoList /></div>);
render(<App/>, document.body);
