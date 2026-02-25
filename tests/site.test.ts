import { buildTitle } from "@/lib/site";

describe("buildTitle", () => {
  it("appends site name", () => {
    expect(buildTitle("Home")).toBe("Home | AI Onboarded");
  });
});
