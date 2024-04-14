SELECT 
    u.usuario_id AS usuario_id,
    u.usuario_nome AS usuario_nome,
    CASE
        WHEN u.cargo_id = 5 THEN (SELECT SUM(pontos_qtd) FROM pontos) * 0.35
        WHEN u.cargo_id = 4 THEN ((SELECT SUM(pontos_qtd) FROM pontos) * 0.35) * 0.2
        ELSE SUM(IFNULL(p.pontos_qtd, 0))
    END AS usuario_pontos,
    r.cargo_label AS cargo_label,
    CASE
        WHEN 
            CASE
                WHEN u.cargo_id = 5 THEN (SELECT SUM(pontos_qtd) FROM pontos WHERE usuario_id = u.usuario_id) * 0.35
                WHEN u.cargo_id = 4 THEN ((SELECT SUM(pontos_qtd) FROM pontos WHERE usuario_id = u.usuario_id) * 0.35) * 0.2
                ELSE SUM(IFNULL(p.pontos_qtd, 0))
            END <= 50 THEN 'bronze'
        WHEN 
            CASE
                WHEN u.cargo_id = 5 THEN (SELECT SUM(pontos_qtd) FROM pontos WHERE usuario_id = u.usuario_id) * 0.35
                WHEN u.cargo_id = 4 THEN ((SELECT SUM(pontos_qtd) FROM pontos WHERE usuario_id = u.usuario_id) * 0.35) * 0.2
                ELSE SUM(IFNULL(p.pontos_qtd, 0))
            END > 50 THEN 'silver'
        ELSE 'gold'
    END AS classificacao
FROM 
    usuario u
JOIN 
    cargo r ON u.cargo_id = r.cargo_id
LEFT JOIN 
    pontos p ON u.usuario_id = p.usuario_id
GROUP BY 
    u.usuario_id;