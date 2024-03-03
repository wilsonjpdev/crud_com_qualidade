const fs = require("fs")
const dbFilePath = "./db"

function create(content) {
    fs.writeFileSync(dbFilePath, content)
    return content
}

create("Testando nodemon")