import { afterEach, describe, expect, it } from "vitest";
import { LOADER_KEY, markLoaderShown, shouldShowLoader } from "../lib/loader";

afterEach(() => sessionStorage.clear());

describe("shouldShowLoader", () => {
  it("is false in jsdom, which has no WebGL", () => {
    expect(shouldShowLoader()).toBe(false);
  });
  it("is false once the loader has been shown this session", () => {
    markLoaderShown();
    expect(sessionStorage.getItem(LOADER_KEY)).toBe("1");
    expect(shouldShowLoader({ webgl: true, reducedMotion: false })).toBe(false);
  });
  it("is true only with WebGL, motion allowed, and no session mark", () => {
    expect(shouldShowLoader({ webgl: true, reducedMotion: false })).toBe(true);
    expect(shouldShowLoader({ webgl: false, reducedMotion: false })).toBe(false);
    expect(shouldShowLoader({ webgl: true, reducedMotion: true })).toBe(false);
  });
});
