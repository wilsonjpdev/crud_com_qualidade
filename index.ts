import fs from 'fs'
const dbFilePath = "./db"
import { v4 as uuid } from "uuid"

interface Todo {
    id: string,
    date: string,
    content: string,
    done:boolean
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false
    }

    const todos: Array<Todo> = [
        ...read(),
        todo
    ]
    
    fs.writeFileSync(dbFilePath, JSON.stringify({todos}, null, 2))
    return todo
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(dbFilePath, 'utf-8')
    const db = JSON.parse(dbString || "{}")
    if(!db.todos) {
        return []
    }
    return db.todos
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
    let updatedTodo
    const todos = read()
    todos.forEach(currentTodo => {
        const isToUpdate = currentTodo.id === id
        if(isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo)
        }
    })
    fs.writeFileSync(dbFilePath, JSON.stringify({
        todos
    }, null, 2))
    if(!updatedTodo) {
        throw new Error("Please, provide a new ID")
    }
    return updatedTodo
}

function deleteById(id: string) {
    const todos = read()
    const todoWithoutOne = todos.filter(todo => {
        if(id === todo.id) {
            return false
        }
        return true
    })
    fs.writeFileSync(dbFilePath, JSON.stringify({
        todos: todoWithoutOne
    }, null, 2))
}

function CLEAR_DB() {
    fs.writeFileSync(dbFilePath, "")
}

CLEAR_DB()
create("Primeira todo")
const secondTodo = create("Segunda todo")
deleteById(secondTodo.id)
const ThirdTodo = create("Terceira todo")
update(ThirdTodo.id, {
    content: "Atualizado"
})
console.log(read())