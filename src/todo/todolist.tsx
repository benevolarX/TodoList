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
/*
class TodoItem extends Component<{}, {}> {
    public constructor(prop: {}) {
        super(prop);
    }
    public render() {
        return <div class="full-width">
            <span>X</span> { this.Text }
        </div>;
    }

    private get Text() {
        return <span>texte</span>;
    }
}*/

export default class TodoList extends Component<IProps, IState> {

    public constructor(prop: IProps) {
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
        return true;
    }

    public render(props: {}, state: IState) {
        const nb = this.state.liste.filter(this.state.filter).length as number;
        const form = <form class="flex jc-around " action="javascript:">
        <span>count : {nb} </span>
        <button onClick={() => this.setFilter(FILTERS.all)} class="btn circle">All</button>
        <button onClick={() => this.setFilter(FILTERS.active)} class="btn circle">Active</button>
        <button onClick={() => this.setFilter(FILTERS.completed)} class="btn circle">Complete</button>
        {
            this.state.liste.filter(FILTERS.completed).length > 0 ?
            <button onClick={this.clearComplete} class="btn circle">Clear Complete</button> : ""
        }
        </form>;
        const todo = <div class="flex col txt-center bg-blue">
            <header class="">
                <h2 class="txt-size-2 title-section">todos</h2>
                <form action="javascript:" onSubmit={this.addTodo}>
                    <label for="todo">todo : </label>
                    <input class="w-50" type="text" name="todo" id="todo" /><br/><br/>
                </form>
                { form }
            </header>
            <div class="">
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
            <footer class="">
                { form }
            </footer>
        </div>;
        return todo;
    }

    private addTodo(e: Event) {
        const form = e.target as HTMLFormElement;
        // console.log(form);
        const inputs = form.getElementsByTagName("input");
        const input = inputs[0];
        // console.log(input);
        const texte = input.value as string;
        input.value = "";
        if (texte !== "") {
            const todo: ITodo = { texte, completed: false };
            const liste = this.state.liste.concat(todo);
            this.setState({ liste });
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
