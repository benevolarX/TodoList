import { Component, h, render } from "preact";
import ITodo from "./todo";

interface IState {
    filter: ((t: ITodo) => boolean);
    liste: ITodo[];
    texte: string;
}

const FILTERS = {
    active: (todo: ITodo) => !todo.completed,
    all: (todo: ITodo) => true,
    completed: (todo: ITodo) => todo.completed,
};

export default class TodoList extends Component<{}, IState> {

    constructor(prop: {}) {
        super(prop);
        this.addTodo = this.addTodo.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearComplete = this.clearComplete.bind(this);
        this.state = {
            filter: FILTERS.all,
            liste: [
                { texte: "hello", completed: false },
                { texte: "bye", completed: true },
            ],
            texte: "",
        };
    }

    public shouldComponentUpdate() {
        return true;
    }

    public render(props: {}, state: IState) {
        const nb = this.state.liste.length as number;
        const todo = <div class="flex col txt-center">
            <header class="bg-blue">
                <h2 class="txt-size-2 txt-red title-section">todos</h2>
                <form action="javascript:" onSubmit={this.addTodo}>
                    <input class="" type="text" name="todo" id="todo" />
                </form>
            </header>
            <div class="bg-green">
                <ul>
                    {
                        this.state.liste.filter(this.state.filter)
                        .map((t: ITodo) =>
                        (<li class={t.completed ? "completed" : ""}>
                            <button class="btn circle" onClick={
                                () => {
                                    t.completed = !t.completed;
                                    this.setState({});
                                }
                            }> x </button>
                            {t.texte}
                        </li>))
                    }
                </ul>
            </div>
            <footer class="bg-yellow">
                <form action="javascript:">
                    <span>count : {nb} </span>
                    <button onClick={() => this.setFilter(FILTERS.all)} class="btn round">All</button>
                    <button onClick={() => this.setFilter(FILTERS.active)} class="btn round">Active</button>
                    <button onClick={() => this.setFilter(FILTERS.completed)} class="btn round">Complete</button>
                    <button onClick={this.clearComplete} class="btn round">Clear Complete</button>
                </form>
            </footer>
        </div>;
        return todo;
    }

    private addTodo(e: Event) {
        const form = e.target as HTMLFormElement;
        const input = form.firstChild as HTMLInputElement;
        const texte = input.value as string;
        input.value = "";
        if (texte !== "") {
            const todo = { texte, completed: false };
            this.setState({
                liste: this.state.liste.concat(todo),
                texte: "",
            });
        }
    }

    private setFilter(f: ((t: ITodo) => boolean)) {
        this.setState({filter: f});
    }

    private clearComplete() {
        const liste = this.state.liste.filter(FILTERS.active);
        this.setState({liste});
    }
}
