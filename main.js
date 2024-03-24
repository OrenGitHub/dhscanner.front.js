const esprima = require('esprima')
const express = require('express')
const multer = require('multer')

const app = express()
const port = 3000

const upload = multer();

app.post('/translator/javascript', upload.single('source'), (req, res) => {
  sourceCode = `${req.file.buffer}`
  let ast;
  try {
    ast = esprima.parseModule(sourceCode, { loc: true });
  }
  catch (error) {
    try {
      ast = esprima.parseScript(sourceCode, { loc: true });
    }
    catch (error) {
      ast = { status: "FAIL" };
    }
  }

  res.send(`>>> ${JSON.stringify(ast)}\n`)
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})