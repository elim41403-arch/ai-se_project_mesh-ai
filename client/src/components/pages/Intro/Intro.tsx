import "./Intro.css";
import Heading from "../../../assets/Heading.png";
import Card1 from "../../../assets/onboardingCards/onboardingCard1.svg"
import Card2 from "../../../assets/onboardingCards/onboardingCard2.svg"
import Card3 from "../../../assets/onboardingCards/onboardingCard3.png"
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro">
      <img src={Heading} alt="Welcome to Mesh Ai" className="intro__heading" />
      <section className="onboarding-cards">
        <div className="onboarding-card__container">
          <img src={Card1} alt="Files collecting" className="onboarding-card_icon"></img>
          <p className="onboarding-card_description">Bring all your documents into one secure AI workspace</p>
        </div>
        <div className="onboarding-card__container">
          <img src={Card2} alt="Files going into a folder" className="onboarding-card_icon"></img>
          <p className="onboarding-card_description">Organize and manage the documents that power your AI</p>
        </div>
        <div className="onboarding-card__container">
          <img src={Card3} alt="Files sparkling" className="onboarding-card_icon"></img>
          <p className="onboarding-card_description">Your Knowledge base, accessible through a simple chat interface</p>
        </div>
      </section>
      <p className="intro__message">Start by creating your Organization's Knowledge Base</p>
      <button 
        className="intro__start-button"
        aria-label="start building your knowledge base"
        onClick={() => navigate('/knowledge')}
        >
        Start
        </button>
    </div>
  );
}