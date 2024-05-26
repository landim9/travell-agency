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
    remove,
    update
}