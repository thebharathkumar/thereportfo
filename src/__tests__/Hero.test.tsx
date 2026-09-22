import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROFILE } from "../content";
import { Hero } from "../sections/Hero";

describe("Hero", () => {
  it("names Bharath in full and links the four destinations", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("Bharath Kumar Rajesh");
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", PROFILE.links.github);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", PROFILE.links.linkedin);
    expect(screen.getByRole("link", { name: /Email/ })).toHaveAttribute("href", `mailto:${PROFILE.links.email}`);
    expect(screen.getByRole("link", { name: /Resume/ })).toHaveAttribute("href", PROFILE.links.resume);
    expect(screen.getByText(PROFILE.thesis)).toBeInTheDocument();
  });
});
