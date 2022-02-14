const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4 } = require("uuid");


describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
   
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it("should throw an error if title is null", (done) => {
        Pokemon.create({ name: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      describe("Creating pokemon", () => {
        it("should work when its a valid name", () => {
          Pokemon.create({
            name: "Pikachu",
          }).then(() => done());
        });
      it("should return the pokemon created", async () => {
        let newPoke = await Pokemon.create({
          id: v4(),
          name: "bulbasaur",
          hp: 45,
          attack: 49,
          defense: 49,
          speed: 45,
          height: 7,
          weight: 69,
          sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          createdInDb: true,
          types: ['fire'],
        });
        expect(newPoke.name).to.equal("bulbasaur");
        expect(newPoke.defense).to.equal(49);
        expect(newPoke.speed).to.equal(45);
      }) 
    });
  });
  });
});
