import PageBanner from "../components/PageBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TeamCard from "../components/TeamCard.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import { team } from "../data/team.js";
import "./Team.css";

export default function Team() {
  return (
    <>
      <PageBanner
        eyebrow="Our Legal Team"
        title="Experienced Professionals. Dedicated Representation."
        description="Our consultants bring focused experience across different areas of practice, working together to give every client considered guidance."
        crumbs={[{ label: "Our Team" }]}
      />

      <section className="section team-page">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Our Legal Team"
            title="Meet the People Behind Your Matter"
          />
          <div className="team-page__grid">
            {team.map((member, i) => (
              <TeamCard member={member} index={i} key={member.id} />
            ))}
          </div>
          <p className="team-page__note">
            Team profiles shown are illustrative placeholders. Individual consultant
            details are confirmed directly when a matter is assigned.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Prefer to Speak With Someone Directly?"
        subheading="We'll match you with the right consultant."
        text="Tell us about your matter and we will connect you with a member of our team best suited to help."
      />
    </>
  );
}
