const Router = require ('express');
const controller = require ('../controller/bonus_controller');

const router = Router()

router.get('/bonus', async (req, res) => {
    try {
        const response = await controller.getBonusFromAllUsers()
        res.statusCode = 200
        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Error searching data" })
    }
})

router.get('/bonus/:cpf', async (req, res) => {
    try {
        const response = await controller.getBonusByCpf(req.params.cpf)
        res.statusCode = 200
        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Error searching data" })
    }
})

module.exports = router;