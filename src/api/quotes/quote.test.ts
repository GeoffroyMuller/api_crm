import "../../config/database";
import productService from "../products/product.service";
import userService from "../users/user.service";
import quoteService from "./quote.service";

async function createRandomUser() {
  return await userService.createCompanyOwner(
    {
      firstname: "test",
      lastname: "test",
      email: "test@test.test",
      password: "test",
    },
    {
      name: "test",
    }
  );
}

test("cannot manage quote for another company", async () => {
  const user1 = await createRandomUser();
  const user2 = await createRandomUser();

  let quote = await quoteService.create({ idCompany: user2.idCompany }, user1);
  expect(quote.idCompany).toBe(user1.idCompany);
  quote = await quoteService.update(
    { id: quote.id, idCompany: user2.idCompany },
    user1
  );
  expect(quote.idCompany).toBe(user1.idCompany);
  await quoteService.remove(quote.id as number, user1);

  await userService.deleteCompanyOwner(user1);
  await userService.deleteCompanyOwner(user2);
});

test("cannot get quote of another company", async () => {
  const user1 = await createRandomUser();
  const user2 = await createRandomUser();
  const quote = await quoteService.create({}, user1);

  expect(quoteService.getById(quote.id as number, user2)).rejects.toThrow();
  expect(
    quoteService.getAll([], { $eq: { idCompany: user1.idCompany } }, user2)
  ).resolves.toHaveLength(0);

  await quoteService.remove(quote.id as number, user1);
  await userService.deleteCompanyOwner(user1);
  await userService.deleteCompanyOwner(user2);
});

test("cannot link product of another company on add/update quote line", async () => {
  const user1 = await createRandomUser();
  const user2 = await createRandomUser();
  const quote = await quoteService.create({}, user1);
  const product = await productService.create(
    { idCompany: user2.idCompany },
    user2
  );

  expect(
    quoteService.update({ ...quote, lines: [{ idProduct: product.id }] }, user1)
  ).rejects.toThrow();

  await quoteService.remove(quote.id as number, user1);
  await productService.remove(product.id as number, user2);
  await userService.deleteCompanyOwner(user1);
  await userService.deleteCompanyOwner(user2);
});
