const router = require("express").Router();

const {
  createPet,
  getAllPets,
  getPet,
} = require("../controllers/pets.controllers");

// router.route("/pets").post(createPet).get(getAllPets);
// router.route("/pets/:petId").get(getPet);

/**
 * @swagger
 * components:
 *   schemas:
 *     Pets:
 *       type: object
 *       required:
 *         - name
 *         - tag
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The book title
 *         tag:
 *           type: string
 *           description: The book author
 *       example:
 *         name: Juan
 *         tag: Fish
 */

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: The Pets Store managing API
 */

/**
 * @swagger
 * /api/v1/pets:
 *   post:
 *     summary: Create a new book
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pets'
 *     responses:
 *       200:
 *         description: The Pets was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pets'
 *       500:
 *         description: Some server error
 */

router.post("/", createPet);

/**
 * @swagger
 * /api/v1/pets:
 *   get:
 *     summary: Returns the list of all the pets in the store
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: The list of the Pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pets'
 */

router.get("/", getAllPets);

/**
 * @swagger
 * /api/v1/pets/{petId}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: string
 *         required: true
 *         description: The PetId
 *     responses:
 *       200:
 *         description: The Pet description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pets'
 *       404:
 *         description: The Pet was not found
 */

router.route("/:petId").get(getPet);

module.exports = router;
