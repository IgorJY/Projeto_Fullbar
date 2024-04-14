const db = require('./service_utils');

exports.getUser = async function(cpf) {
    return await db('usuario')
      .select('usuario.*', 'cargo.cargo_ponto as cargo_ponto')
      .leftJoin('cargo', 'usuario.cargo_id', 'cargo.cargo_id')
      .where('usuario.usuario_cpf', cpf)
      .where('usuario.inactivated', 0)
      .first();
}

exports.addVenda = async function(venda) {
    return db('pontos').insert({
        usuario_id: venda.usuario_id,
        pontos_descricao: venda.pontos_descricao,
        pontos_qtd: venda.pontos_qtd,
        pontos_status: venda.pontos_status,
    })
}