import express from 'express'
import PG from 'pg'

//PG.defaults.database = 'deepdish'

const dbPool = new PG.Pool()


const app = express()

const logger = (req, res, next) => {
  console.log("reieved request: __%s__ at %s'", JSON.stringify(req.path), Date.now())
  next()
}

const dbRetriever = (req, res, next) => {
  console.log('database!')
  dbPool.query('SELECT $1::text as message', ['hello!'])
        .then((result) => console.log(result))
          .catch((error) => {
            console.log('oh no! :', error)
            req.status(500).send(error)
          })
}

app.use('/', logger, dbRetriever)

app.get('/', (req, res) => {
  res.send('wow!')
})

app.listen(5000)
