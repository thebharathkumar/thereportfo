import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Work } from "../sections/Work";

const numberFor = (name: string) =>
  screen.getByRole("heading", { level: 3, name })!.closest("[data-cell]")!.querySelector(".cell__num")!
    .textContent;

describe("Work", () => {
  it("renders 9 featured cells and 15 compact rows with the honesty badges", () => {
    render(<Work />);
    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(document.querySelectorAll(".row")).toHaveLength(15);
    const roadmap = document.querySelector('[data-roadmap="true"]') as HTMLElement;
    expect(roadmap).not.toBeNull();
    expect(roadmap.classList.contains("row")).toBe(true);
    expect(within(roadmap).getByText("ROADMAP")).toBeInTheDocument();
    expect(within(roadmap).getByText("MCP Trust Scanner")).toBeInTheDocument();
    expect(roadmap.querySelector(".cell__num")!.textContent).toBe("24.");
    expect(screen.getByText("IN PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("pip install agent-triage")).toBeInTheDocument();
  });

  it("filters across both tiers and keeps the original numbers", () => {
    render(<Work />);
    const forge = numberFor("ForgeSync");
    const jober = numberFor("jober");

    fireEvent.click(screen.getByRole("button", { name: /^Featured/ }));
    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(document.querySelectorAll(".row")).toHaveLength(0);
    expect(screen.getByRole("button", { name: /^Featured/ })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /^Governance and Trust/ }));
    expect(numberFor("ForgeSync")).toBe(forge);
    expect(numberFor("jober")).toBe(jober);
    expect(screen.getAllByRole("article").length + document.querySelectorAll(".row").length).toBe(8);
  });
});
