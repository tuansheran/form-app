import { schema } from "../lib/schema"; 

describe("Onboarding Zod Schema", () => {
  it("accepts valid input", () => {
    const validData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX"],
      budget: 50000,
      startDate: new Date().toISOString().split("T")[0],
      acceptTerms: true,
    };
    expect(() => schema.parse(validData)).not.toThrow();
  });

  it("rejects short fullName", () => {
    const invalidData = {
      fullName: "A",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX"],
      budget: 50000,
      startDate: new Date().toISOString().split("T")[0],
      acceptTerms: true,
    };
    expect(() => schema.parse(invalidData)).toThrow();
  });

  it("rejects invalid email", () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "not-an-email",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX"],
      budget: 50000,
      startDate: new Date().toISOString().split("T")[0],
      acceptTerms: true,
    };
    expect(() => schema.parse(invalidData)).toThrow();
  });

  it("requires acceptTerms", () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX"],
      budget: 50000,
      startDate: new Date().toISOString().split("T")[0],
      acceptTerms: false,
    };
    expect(() => schema.parse(invalidData)).toThrow();
  });
});
