import { about, techStack } from "../data/siteContent";
import { SectionHeading } from "../components/ui/SectionHeading";

const categories = [
  { key: "languages", label: "Languages" },
  { key: "backend", label: "Backend" },
  { key: "ml", label: "Applied ML" },
  { key: "platform", label: "Infrastructure" },
] as const;

export function StackSection() {
  return (
    <section id="stack" className="section about-section">
      <div className="container">
        <SectionHeading
          number="03"
          label="About & capabilities"
          title="Curious by default."
        >
          An engineer who enjoys connecting the pieces.
        </SectionHeading>
        <div className="about-grid">
          <div className="about-copy">
            <p>{about.introduction}</p>
            <p>{about.approach}</p>
            <p className="about-principle">
              Build it. Measure it. <em>Make it useful.</em>
            </p>
          </div>
          <dl className="capabilities">
            {categories.map((category) => (
              <div key={category.key}>
                <dt>{category.label}</dt>
                <dd>
                  {techStack
                    .filter((item) => item.category === category.key)
                    .map((item) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
