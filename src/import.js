const prompt = require("prompt-sync")();
const { table } = require("console");
const { parse } = require("csv-parse");
const fs = require("fs");
const readline = require("readline");
const axios = require('axios')

// caminho do csv
const path = "dataset/TesteNodeJs 1.csv";

// criando a stream de leitura
const readStream = fs.createReadStream(path);

// criando a incerface readline
const readInterface = readline.createInterface({
  input: readStream
});

const vendas = []

//lendo as linhas
readInterface.on("line", (line) => {
    makeRequest(line)
});

// fechando a leitura do cvs
readInterface.on("close", () => {
  console.log(vendas);
});

// lidando com erros
readInterface.on("error", (err) => {
  console.error("Error reading the CSV file:", err);
});

async function makeRequest(line) {
  const row = line.split(";");
  const cpf = row[0]
  const descricao = row[1]
  const status = row[2]

  const venda = { cpf: cpf, descricao: descricao, status: status }
  vendas.push(venda)

  try {
    await axios.post("http://localhost:8080/venda", venda)
  } catch (err) {
    console.log(err)
  }
}