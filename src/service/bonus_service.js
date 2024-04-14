const db = require('./service_utils');

exports.getBonus = async function () {
  return await db('usuario AS u')
    .select(
      'u.usuario_id AS usuario_id',
      'u.usuario_nome AS usuario_nome',
      db.raw(`
        CASE
          WHEN u.cargo_id = 5 THEN (SELECT SUM(pontos_qtd) FROM pontos) * 0.35
          WHEN u.cargo_id = 4 THEN ((SELECT SUM(pontos_qtd) FROM pontos) * 0.35) * 0.2
          ELSE SUM(IFNULL(p.pontos_qtd, 0))
        END AS usuario_pontos
      `),
      'r.cargo_label AS cargo_label'
    )
    .leftJoin('cargo AS r', 'u.cargo_id', 'r.cargo_id')
    .leftJoin('pontos AS p', 'u.usuario_id', 'p.usuario_id')
    .groupBy('u.usuario_id')
}

exports.getBonusByCpf = async function (cpf) {
  return await db('usuario AS u')
    .select(
      'u.usuario_id AS usuario_id',
      'u.usuario_nome AS usuario_nome',
      db.raw(`
                CASE
                    WHEN u.cargo_id = 5 THEN (SELECT SUM(pontos_qtd) FROM pontos) * 0.35
                    WHEN u.cargo_id = 4 THEN ((SELECT SUM(pontos_qtd) FROM pontos) * 0.35) * 0.2
                    ELSE SUM(IFNULL(p.pontos_qtd, 0))
                 END AS usuario_pontos
            `),
      'r.cargo_label AS cargo_label'
    )
    .leftJoin('cargo AS r', 'u.cargo_id', 'r.cargo_id')
    .leftJoin('pontos AS p', 'u.usuario_id', 'p.usuario_id')
    .groupBy('u.usuario_id')
    .where('u.usuario_cpf', cpf)
}

exports.addbonus = async function(bonus) {
  return db('pontos').insert({
      usuario_id: venda.usuario_id,
      pontos_descricao: venda.pontos_descricao,
      pontos_qtd: venda.pontos_qtd,
      pontos_status: venda.pontos_status,
  })
}