import fs from 'fs'
const dbFilePath = "./db"

interface Todo {
    date: string,
    content: string,
    done:boolean
}

function create(content: string) {
    const todo: Todo = {
        date: new Date().toISOString(),
        content: content,
        done: false
    }

    const todos: Array<Todo> = [
        ...read(),
        todo
    ]
    
    fs.writeFileSync(dbFilePath, JSON.stringify({todos}, null, 2))
    return content
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(dbFilePath, 'utf-8')
    const db = JSON.parse(dbString || "{}")
    if(!db.todos) {
        return []
    }
    return db.todos
}

create("Nova Todo")
console.log(read())