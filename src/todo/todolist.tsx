import { Component, h, render } from "preact";

interface ITodo {

    completed: boolean;
    texte: string;

}

interface IProps {
    todos?: ITodo[];
}

interface IState {

    filter: ((t: ITodo) => boolean);
    liste: ITodo[];

}

const FILTERS = {
    active: (todo: ITodo) => !todo.completed,
    all: (todo: ITodo) => true,
    completed: (todo: ITodo) => todo.completed,
};

export default class TodoList extends Component<IProps, IState> {

    constructor(prop: IProps) {
        super(prop);
        this.addTodo = this.addTodo.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.clearComplete = this.clearComplete.bind(this);
        const defaultList = [
            { texte: "hello", completed: false },
            { texte: "bye", completed: true },
        ];
        const liste = (prop.todos || defaultList);
        this.state = {
            filter: FILTERS.all,
            liste,
        };
    }

    public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        return this.state.filter !== nextState.filter || this.state.liste.length !== nextState.liste.length;
    }

    public render(props: {}, state: IState) {
        console.log("render");
        const nb = this.state.liste.filter(this.state.filter).length as number;
        const todo = <div class="flex col txt-center">
            <header class="bg-blue">
                <h2 class="txt-size-2 txt-red title-section">todos</h2>
                <form action="javascript:" onSubmit={this.addTodo}>
                    <input class="w-50" type="text" name="todo" id="todo" /><br/><br/>
                </form>
            </header>
            <div class="bg-green">
                <ul>
                    {
                        this.state.liste.filter(this.state.filter)
                        .map((t: ITodo) => (<li class={t.completed ? "completed" : ""}>
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
                <form class="flex jc-around " action="javascript:">
                    <span>count : {nb} </span>
                    <button onClick={() => this.setFilter(FILTERS.all)} class="btn circle">All</button>
                    <button onClick={() => this.setFilter(FILTERS.active)} class="btn circle">Active</button>
                    <button onClick={() => this.setFilter(FILTERS.completed)} class="btn circle">Complete</button>
                    {
                        this.state.liste.filter(FILTERS.completed).length > 0 ?
                        <button onClick={this.clearComplete} class="btn circle">Clear Complete</button> : ""
                    }
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
            this.setState({ liste: this.state.liste.concat(todo) });
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
