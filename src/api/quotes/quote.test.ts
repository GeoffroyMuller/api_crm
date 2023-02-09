import "../../config/database";
import companyService from "../companies/company.service";
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

  return;
});
