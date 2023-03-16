import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { BiEdit, BiSave } from "react-icons/bi";

interface ITodo {
    name: string,
    status: "completed" | "incomplete",
    isupdate: boolean
}

const Todo = () => {
    const intialTodo: ITodo = {
        name: "",
        status: "incomplete",
        isupdate: false
    }
    const [todos, setTodos] = useState<ITodo[]>([intialTodo])
    const [inputTodo, setInputTodo] = useState<string>("")

    const updateTodo = (index: number, name: string) => {
        const updatedList = todos.map((todo, i) => {
            if (i === index) {
                todo.name = name
            }
            return todo
        })
        setTodos(updatedList)
        localStorage.setItem("todolist", JSON.stringify(updatedList))
    }

    const todoStatusChange = (index: number) => {
        const updatedList = todos.map((todo, i) => {
            if (i === index) {
                todo.status === "completed" ? todo.status = "incomplete" : todo.status = "completed"
            }
            return todo
        })
        setTodos(updatedList)
        localStorage.setItem("todolist", JSON.stringify(updatedList))
    }

    const addingTodos = (name: string) => {
        const newTodo: ITodo[] = [...todos, {
            name: name,
            status: "incomplete",
            isupdate: false
        }]
        setTodos(newTodo);
        localStorage.setItem("todolist", JSON.stringify(newTodo))
    }

    const deleteTodo = (index: number) => {
        const updatedList = todos.filter((todo, i) => i !== index);
        setTodos(updatedList);
        localStorage.setItem("todolist", JSON.stringify(updatedList))
    }

    const toggleEdit = (index: number) => {
        const updatedList = todos.map((todo, i) => {
            if (i === index) {
                todo.isupdate = !todo.isupdate
            }
            return todo
        })
        setTodos(updatedList)
        localStorage.setItem("todolist", JSON.stringify(updatedList))
    }

    useEffect(() => {
        const previousList = localStorage.getItem("todolist");
        if (previousList) {
            setTodos(JSON.parse(previousList))
        }
    }, [])
    return (
        <div className="h-3/4 w-2/6 shadow-2xl bg-gray-100 rounded-md items-center">
            <h1 className="text-5xl font-bold">Todo App</h1>
            <div className="ml-auto mr-auto">
                <div className="flex mt-9 ml-5">
                    <input
                        type="text"
                        value={inputTodo}
                        id="todo"
                        name="todo"
                        onChange={(e) => { setInputTodo(e.target.value) }}
                        className=" focus-visible:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:placeholder-gray-400 "
                        placeholder="Enter Your Task..." />
                    <button className="btn btn-blue" onClick={() => { addingTodos(inputTodo) }}>
                        <AiOutlinePlus className="ml-5 hover:bg-indigo-500 bg-indigo-600 text-white text-5xl" />
                    </button>
                </div>
                <div className=" justify-between mt-10 text-lg font-semibold h-10 ml-5  mr-10">
                    {todos?.map((todo, index: number) => {
                        return (
                            <>
                                <div className="items-center justify-between flex bg-gray-200 mt-3" key={index}>
                                    <div>
                                        {
                                            todo.isupdate ?
                                                <input
                                                    type="text"
                                                    value={todo.name}
                                                    id="todo"
                                                    disabled={!todo.isupdate}
                                                    name="updateTodo"
                                                    onChange={(e) => { updateTodo(index, e.target.value) }}
                                                    className=" focus-visible:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:placeholder-gray-400 "
                                                    placeholder="Enter Your Task..." />
                                                :
                                                <label
                                                    className={`inline-block ml-2 ${todo.status === "completed" ? "line-through" : ""} break-all hover:cursor-pointer`}
                                                    htmlFor="radioDefault01"
                                                    onClick={() => todoStatusChange(index)}
                                                >
                                                    {todo?.name}
                                                </label>
                                        }
                                    </div>
                                    <div>
                                        <button className="ml-5 mr-5" onClick={() => { toggleEdit(index) }}>
                                            {todo.isupdate ? <BiSave className="text-indigo-500" /> : <BiEdit className="text-indigo-500" />}
                                        </button>
                                        <button key={index} onClick={(e: any) => { deleteTodo(index); }}>
                                            <AiFillDelete className="text-red-500" />
                                        </button>
                                    </div>
                                </div>

                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Todo;