import { useCallback, useEffect, useState } from "react";
import { BlobCursor } from "./effects/BlobCursor";
import { Loader } from "./effects/Loader";
import { useReveal } from "./hooks/useReveal";
import { shouldShowLoader } from "./lib/loader";
import { Contact } from "./sections/Contact";
import { Credentials } from "./sections/Credentials";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Nav } from "./sections/Nav";
import { Numbers } from "./sections/Numbers";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";

export function App() {
  const [loading, setLoading] = useState(shouldShowLoader);
  const finishLoading = useCallback(() => setLoading(false), []);
  useReveal();

  // Hero entrance animations wait for the loader (CSS pauses them under this class).
  useEffect(() => {
    document.documentElement.classList.toggle("is-loading", loading);
    return () => document.documentElement.classList.remove("is-loading");
  }, [loading]);

  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Numbers />
        <Skills />
        <Credentials />
      </main>
      <Contact />
      <BlobCursor />
      {loading && <Loader onDone={finishLoading} />}
    </>
  );
}
