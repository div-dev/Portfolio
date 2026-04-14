import Navbar from "./components/Navbar";
import MarqueeTicker from "./components/MarqueeTicker";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main id="page-main">
      <Navbar />
      <Hero />

      <MarqueeTicker
        items={["Python", "FastAPI", "Kafka", "Airflow", "Docker", "PostgreSQL", "Redis", "ETL Pipelines"]}
        speed={45}
      />

      <About />

      <Skills />

      <MarqueeTicker
        items={["Backend Engineering", "Distributed Systems", "Data Pipelines", "API Design", "Cloud Infrastructure"]}
        speed={35}
        reverse
        separator="—"
      />

      <Experience />

      <Projects />

      <Contact />
    </main>
  );
}
