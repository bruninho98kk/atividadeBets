import { Router } from "express";

const suspeitosRoutes = Router();

let suspeitos = [
    {  
   id: Math.floor(Math.random() * 1000000),
    nome: "Big Boss",
    profissao: "Estelionato",
    envGolpe: "Yes", // envolvimento em golpes
    idade: 22,
    nivSusp: [
        "Alto",
        "Médio",
        "Baixo"

    ] // nivel de suspeito
    },
];

//rota pra buscar todas suspeitos
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
    // validação de idade
    if(nivSusp) {
        return res.status(400).send({
            message: "O nível de suspeita é alto"
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








  const emocao = suspeitos.find((emotion) => emotion.id == id)

    if (!emocao) {
        return res.status(404).send({
            message: "suspeito não encontrada!",
        });
    }

return res.status(200).send({
    message: "suspeito encontrada",
    emocao,
});

});

suspeitosRoutes.put("/:id", (req, res) => {
    const{ id } = req.params;

    const emocao = suspeitos.find((emotion) => emotion.id = id);
    if(!emocao) {
        return res.status(404).send({
            message: "suspeito não encontra!"
        })
    }
    const {nome, cor} = req.body
    emocao.nome = nome;
    emocao.cor = cor;

    return res.status(200).send({
        message: "suspeito atualizada!",
        emocao,
    })
});

suspeitosRoutes.delete("/:id", (req, res) => {
    const{ id } = req.params;

    const emocao = suspeitos.find((emotion) => emotion.id = id);
    if(!emocao) {
        return res.status(404).send({
            message: "suspeito não encontrada!"
        })
    }

    suspeitos = suspeitos.filter((emotion) => emotion.id != id);
    
    return res.status(200).send({
        message: "suspeito deletada!",
        emocao,
    });
});
export default suspeitosRoutes;