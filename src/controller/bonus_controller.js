const service = require('../service/bonus_service')

exports.getBonusFromAllUsers = async function() {
    return await service.getBonus()
}

exports.getBonusByCpf = async function(user_cpf) {
    if (user_cpf != null) {
        return await service.getBonusByCpf(user_cpf)
    } else {
        return {}
    }
}