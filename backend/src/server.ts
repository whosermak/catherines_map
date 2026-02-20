import app from "./app.js";

const PORT = 5000
app.listen(PORT, (e) => {
    console.log('слушаю')
    console.log(e)
})