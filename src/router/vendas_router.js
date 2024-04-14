const Router = require ('express');
const controller = require ('../controller/vendas_controller');

const router = Router()

router.post('/venda', async (req, res) => {
    try {
        const response = await controller.postVenda(req.body)
        res.statusCode = 200
        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Error saving data" })
    }
})

module.exports = router;