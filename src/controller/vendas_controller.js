const service = require('../service/vendas_service');

exports.postVenda = async function(body) {
    if (body.cpf == null) {
        return
    }

    if (body.descricao == null) {
        return
    }

    if (body.status == null || body.status == 'REPROVADA') {
        return
    }

    const user = await service.getUser(body.cpf)

    return await service.addVenda({
        usuario_id: user.usuario_id,
        pontos_descricao: body.descricao,
        pontos_qtd: user.cargo_ponto,
        pontos_status: body.status,
    })
}