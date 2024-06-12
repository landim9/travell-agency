const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient

const create = async (req, res) => {
    const data  = req.body;

    console.log(data);

    const pontoTuristico = await prisma.pontosTuristicos.create({
        data
    });

    res.status(201).json(pontoTuristico).end();
}

const read = async (req, res) => {
    const pontosTuristicos = await prisma.pontosTuristicos.findMany();

    res.status(200).json(pontosTuristicos).end();
}

const readById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }
        
        const pontoTuristico = await prisma.pontosTuristicos.findMany({
            where: { id_destinos: id }
        });

        if (!pontoTuristico || pontoTuristico.length === 0) {
            return res.status(404).json({ error: 'Ponto turístico não encontrado' });
        }

        return res.status(200).json(pontoTuristico);
    } catch (error) {
        console.error('Erro ao buscar ponto turístico:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


const remove = async (req, res) => {
    const pontosTuristicos = await prisma.pontosTuristicos.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(pontosTuristicos).end();
}

//param id
//body info
const update = async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;

    const pontoTuristico = await prisma.pontosTuristicos.update({
        where: {
            id
        },
        data
    });

    res.status(200).json(pontoTuristico).end();
}
   
module.exports = {
    create,
    read,
    readById,
    remove,
    update
}