import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = [
    {  
   id: Math.floor(Math.random() * 1000000),
    nome: "Big Boss",
    profissao: "Estelionato",
    envGolpe: "Yes", // envolvimento em golpes
    nivSusp:  "Alto"
  
    // nivel de suspeito
    },
];

//rota pra buscar todos suspeitos
suspeitosRoutes.get("/", (req, res) => {
   return res.status(200).send(suspeitos)
});

suspeitosRoutes.post("/", (req, res) => {
    const { nome, profissao, envGolpe, nivSusp } = req.body;

    //Validação dos campos nome e profissao

if(!nome || !profissao) {
    return res.status(400).send({
        message: "O nome ou a profissao não foi preenchido",
    });
} 
    // validação de periculosidade
    if (!["Baixo", "Médio", "Alto"].includes(nivSusp)) {
        return res.status(400).send({
            message: "O nível de suspeito não foi especificado"
        });
    }

    const novosuspeito = {
        id: Math.floor(Math.random() * 1000000),
        nome, 
        profissao,
        nivSusp,
        envGolpe
    }

    suspeitos.push(novosuspeito);

    return res.status(201).send({
        message: "suspeito cadastrado com sucesso!",
    });
});

suspeitosRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
 
//console.log(id);

    const suspeito = suspeitos.find((suspeito) => suspeito.id == id);

  if (!suspeito){  
    return res.status(404).send({
        message: "suspeito não encontrado",
    });
}


  const crime = suspeitos.find((suspect) => suspect.id == id)

    if (!crime) {
        return res.status(404).send({
            message: "suspeito não encontrado!",
        });
    }

return res.status(200).send({
    message: "suspeito encontrado",
    crime,
});

});

suspeitosRoutes.put("/:id", (req, res) => {
    const{ id } = req.params;

    const crime = suspeitos.find((suspect) => suspect.id = id);
    if(!crime) {
        return res.status(404).send({
            message: "suspeito não encontrado!"
        })
    }
    const {nome, suspeito} = req.body
    crime.nome = nome;
    crime.estelionato = suspeito;

    return res.status(200).send({
        message: "suspeito atualizado!",
        crime,
    })
});

suspeitosRoutes.delete("/:id", (req, res) => {
    const{ id } = req.params;

    const crime = suspeitos.find((suspect) => suspect.id = id);
    if(!crime) {
        return res.status(404).send({
            message: "suspeito deletado!"
        })
    }

    suspeitos = suspeitos.filter((suspect) => suspect.id != id);
    
    return res.status(200).send({
        message: "suspeito deletado!",
        crime,
    });
});
export default suspeitosRoutes;