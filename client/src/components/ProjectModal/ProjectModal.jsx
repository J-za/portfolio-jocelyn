import Modal from "react-modal";
import { ReactSVG } from "react-svg";
import "./projectmodal.scss";
import { useState } from "react";

Modal.setAppElement("#root");

function ProjectModal({ isOpen, onClose, project }) {
  const { title, description, carouselImages, tags, githubLink, demoLink } =
    project;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const CloseButton = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
      <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
    </svg>
  );

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="project-modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-btn" onClick={onClose}>
        <CloseButton />
      </button>

      <h2>{title}</h2>

      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="carousel">
        <button className="chevron left" onClick={prevSlide}>
          <ChevronLeft />
        </button>
        <img
          src={carouselImages[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
        />
        <button className="chevron right" onClick={nextSlide}>
          <ChevronRight />
        </button>
      </div>

      <div className="bullets">
        {carouselImages.map((_, i) => (
          <span
            key={i}
            className={`bullet ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>

      <div className="description">
        {description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="links">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn github"
        >
          GitHub
        </a>
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn demo"
        >
          Démo
        </a>
      </div>
    </Modal>
  );
}

export default ProjectModal;
