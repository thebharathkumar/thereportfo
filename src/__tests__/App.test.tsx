import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../App";
import { CERTS, ERRORBARS, EXPERIENCE, PROFILE, SKILLS } from "../content";

describe("App", () => {
  it("renders every section with its content", () => {
    render(<App />);
    for (const id of ["work", "experience", "numbers", "skills", "credentials", "contact"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
    for (const e of EXPERIENCE) expect(screen.getByText(e.role)).toBeInTheDocument();
    for (const r of ERRORBARS) expect(screen.getByText(r.figure)).toBeInTheDocument();
    const skills = within(document.getElementById("skills")!);
    for (const g of SKILLS) expect(skills.getByText(g.group)).toBeInTheDocument();
    for (const c of CERTS) expect(screen.getByText(c.title)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: PROFILE.links.email })).toHaveAttribute(
      "href",
      `mailto:${PROFILE.links.email}`,
    );
    expect(screen.getByText(PROFILE.sponsorship)).toBeInTheDocument();
  });
});
