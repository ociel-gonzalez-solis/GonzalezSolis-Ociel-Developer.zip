const Pets = require("../models/pets.models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createPet = async (req, res, next) => {
  try {
    const newPet = req.body;

    if (typeof newPet.name !== "string" || typeof newPet.tag !== "string") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid data" });
    }

    if (!newPet.name || !newPet.tag) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing data" });
    }

    const pets = await Pets.create(newPet);

    res.status(StatusCodes.CREATED).json({ pets });
  } catch (error) {
    return res.status(error.statusCode).json(error.message);
  }
};

const getAllPets = async (req, res, next) => {
  const pets = await Pets.find();
  console.log(pets);
  res.status(StatusCodes.OK).json({ pets, count: pets.length });
};

const getPet = async (req, res, next) => {
  try {
    const { petId } = req.params;

    const pet = await Pets.findOne({
      _id: petId,
    });

    if (!pet) {
      throw new NotFoundError("Invalid data");
    }

    res.status(StatusCodes.OK).json({ pet });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { createPet, getAllPets, getPet };
