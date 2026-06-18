import { useState, useCallback, useRef } from 'react';
import { questions } from '../data/questions';

interface CardDeckScreenProps {
  onBack: () => void;
}

function pickRandom(exclude?: string): string {
  const pool = questions.filter((q) => q !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

type SwipeDir = 'left' | 'right' | null;
type FlyDir = 'fly-left' | 'fly-right' | null;

export function CardDeckScreen({ onBack }: CardDeckScreenProps) {
  const [question, setQuestion] = useState<string>(() => pickRandom());
  const [isFlipped, setIsFlipped] = useState(true);
  const [swipeDir, setSwipeDir] = useState<SwipeDir>(null);
  const [flyDir, setFlyDir] = useState<FlyDir>(null);
  const [score, setScore] = useState({ got: 0, nope: 0 });

  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const nopeRef = useRef<HTMLDivElement>(null);
  const gotRef = useRef<HTMLDivElement>(null);
  const SWIPE_THRESHOLD = 80;

  const advanceCard = useCallback((dir: 'left' | 'right') => {
    setFlyDir(dir === 'left' ? 'fly-left' : 'fly-right');
    setScore((s) => dir === 'right' ? { ...s, got: s.got + 1 } : { ...s, nope: s.nope + 1 });
    setSwipeDir(null);
    setTimeout(() => {
      setQuestion((prev) => pickRandom(prev));
      setIsFlipped(false);
      setFlyDir(null);
      if (cardRef.current) cardRef.current.style.transform = '';
    }, 380);
  }, []);

  const resetDragStyle = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
    if (nopeRef.current) nopeRef.current.style.opacity = '0';
    if (gotRef.current) gotRef.current.style.opacity = '0';
  };

  // ─── Tap to flip (no-op now that cards start face-up) ───
  const handleCardTap = useCallback(() => {
    // tapping the card does nothing; use buttons or swipe
  }, []);

  // ─── Pointer drag (direct DOM for performance + no inline style prop) ───
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (flyDir) return;
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [isFlipped, flyDir]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    const rotate = dx * 0.08;

    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
      cardRef.current.style.transition = 'none';
    }

    const labelOpacity = Math.min(Math.abs(dx) / SWIPE_THRESHOLD, 1).toString();
    if (Math.abs(dx) > 20) {
      if (dx > 0) {
        if (gotRef.current) gotRef.current.style.opacity = labelOpacity;
        if (nopeRef.current) nopeRef.current.style.opacity = '0';
        setSwipeDir('right');
      } else {
        if (nopeRef.current) nopeRef.current.style.opacity = labelOpacity;
        if (gotRef.current) gotRef.current.style.opacity = '0';
        setSwipeDir('left');
      }
    } else {
      if (nopeRef.current) nopeRef.current.style.opacity = '0';
      if (gotRef.current) gotRef.current.style.opacity = '0';
      setSwipeDir(null);
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const dx = e.clientX - startXRef.current;

    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      advanceCard(dx > 0 ? 'right' : 'left');
    } else {
      if (cardRef.current) cardRef.current.style.transition = '';
      resetDragStyle();
      setSwipeDir(null);
    }
  }, [advanceCard]);

  const total = score.got + score.nope;

  return (
    <div className="card-deck-scene">
      {/* Header */}
      <div className="deck-header">
        <button onClick={onBack} className="deck-back-btn" aria-label="Back to menu">
          ← Back
        </button>
        <span className="deck-title">Card Deck</span>
        <div className="deck-score">
          <span className="deck-score-got">✓ {score.got}</span>
          <span className="deck-score-sep">/</span>
          <span className="deck-score-nope">✗ {score.nope}</span>
          {total > 0 && <span className="deck-score-total">of {total}</span>}
        </div>
      </div>

      {/* Card area */}
      <div className="deck-center">
        <p className="deck-hint">
          Swipe right if found · left if not
        </p>

        <div className="card-stack-wrapper">
          <div className="card-shadow card-shadow-3" />
          <div className="card-shadow card-shadow-2" />
          <div className="card-shadow card-shadow-1" />

          <div
            ref={cardRef}
            className={`card-flip-root ${isFlipped ? 'is-flipped' : ''} ${flyDir ?? ''}`}
            onClick={handleCardTap}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* Card Back */}
            <div className="card-face card-back">
              <div className="card-back-pattern">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="card-back-diamond" />
                ))}
              </div>
              <div className="card-back-center">
                <span className="card-back-icon">🃏</span>
              </div>
            </div>

            {/* Card Front */}
            <div className="card-face card-front">
              <div ref={nopeRef} className="swipe-label swipe-label-nope">NOPE</div>
              <div ref={gotRef} className="swipe-label swipe-label-got">GOT IT!</div>

              <div className="card-corner card-corner-tl"><span>Q</span></div>
              <div className="card-question-text">
                <p>Find someone who…</p>
                <blockquote>{question}</blockquote>
              </div>
              <div className="card-corner card-corner-br"><span>Q</span></div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`deck-actions ${!flyDir ? 'deck-actions--visible' : ''}`}>
          <button
            className={`deck-action-btn deck-action-nope ${swipeDir === 'left' ? 'deck-action--active' : ''}`}
            onClick={() => !flyDir && advanceCard('left')}
            aria-label="Nope"
          >
            <span className="deck-action-icon">✗</span>
            <span>Nope</span>
          </button>
          <button
            className={`deck-action-btn deck-action-got ${swipeDir === 'right' ? 'deck-action--active' : ''}`}
            onClick={() => !flyDir && advanceCard('right')}
            aria-label="Got it"
          >
            <span className="deck-action-icon">✓</span>
            <span>Got it!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
