import React from "react";
import styles from "./MyExpertise.module.scss";

// Clean inline vector logos
const TechIcon = ({ name }) => {
  switch (name) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
          <path d="M15.5 8.5v7m-7-7v7l8.2-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
          <path d="M12 12l9-5M12 12v10M12 12L3 7" strokeWidth="1" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2C11.5 4.5 9 8 9 12c0 3.8 2.3 6.8 3 8 0.7-1.2 3-4.2 3-8 0-4-2.5-7.5-3-10z" />
        </svg>
      );
    default:
      return null;
  }
};

const ExpertiseCard = ({ card, isActive, onToggle }) => {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.activeCard : styles.collapsedCard}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Card Header Row */}
      <div className={styles.cardHeader}>
        <div className={styles.numberCol}>
          <div className={styles.numberBadge}>
            <span>{card.number}</span>
          </div>
          <div className={styles.dashedConnector} />
        </div>

        <h3 className={styles.cardTitle}>{card.title}</h3>

        <div className={styles.arrowButton} aria-label="Toggle card details">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Expanded Content Area */}
      <div className={styles.cardCollapseWrapper}>
        <div className={styles.cardBody}>
          {/* Technology Badges */}
          <div className={styles.badgeList}>
            {card.badges.map((badge, idx) => (
              <span key={idx} className={styles.badgePill}>
                {badge}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className={styles.descriptionText}>{card.description}</p>

          {/* Developer / Visual Showcase Elements */}
          {card.developerElement && (
            <div className={styles.developerShowcase}>
              {card.developerElement.type === "logos" && (
                <div className={styles.logosRow}>
                  {card.developerElement.items.map((item, idx) => (
                    <div key={idx} className={styles.logoItem}>
                      <TechIcon name={item.icon} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {card.developerElement.type === "ai-nodes" && (
                <div className={styles.aiNodesRow}>
                  <span className={styles.aiCodeTag}>{card.developerElement.tag}</span>
                  <div className={styles.nodesChain}>
                    {card.developerElement.nodes.map((node, idx) => (
                      <React.Fragment key={idx}>
                        <div className={styles.nodeChip}>
                          <span className={styles.nodeDot} />
                          <span>{node}</span>
                        </div>
                        {idx < card.developerElement.nodes.length - 1 && (
                          <span className={styles.nodeConnector}>→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {card.developerElement.type === "frontend-metrics" && (
                <div className={styles.metricsRow}>
                  {card.developerElement.items.map((item, idx) => (
                    <div key={idx} className={styles.metricItem}>
                      <span className={styles.metricVal}>{item.value}</span>
                      <span className={styles.metricLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {card.developerElement.type === "architecture-flow" && (
                <div className={styles.architectureFlow}>
                  <div className={styles.archBox}>API</div>
                  <div className={styles.archArrow}>↕</div>
                  <div className={styles.archBox}>SERVER</div>
                  <div className={styles.archArrow}>↕</div>
                  <div className={styles.archBox}>DATABASE</div>
                </div>
              )}

              {card.developerElement.type === "performance-badges" && (
                <div className={styles.perfRow}>
                  {card.developerElement.metrics.map((m, idx) => (
                    <div key={idx} className={styles.perfBadge}>
                      <span className={styles.perfScore}>{m.score}</span>
                      <span className={styles.perfName}>{m.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseCard;
