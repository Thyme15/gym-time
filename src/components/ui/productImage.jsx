import { useState } from "react";
import { Heart, Star } from "lucide-react";

const GT_LOGO = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#1a1a1a" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#c9a84c" fontSize="14" fontWeight="800" fontFamily="Georgia, serif" letterSpacing="1">GT</text>
  </svg>
);

/**
 * GymTime Product Card
 *
 * Props:
 *  - image: string (URL)
 *  - title: string
 *  - category: string (e.g. "UNISEX")
 *  - sizes: string (e.g. "XS–3XL")
 *  - originalPrice: number
 *  - salePrice: number (optional)
 *  - colors: Array<{ label: string, hex: string }>
 *  - rating: number (0–5)
 *  - ratingCount: number
 *  - badge: string (optional, e.g. "LIMITED EDITION")
 */
export default function ProductCard({
  image = "https://placehold.co/400x480/f5f5f0/c9a84c?text=GymTime",
  title = "Hercules Compression Tee",
  category = "UNISEX",
  sizes = "XS–3XL",
  originalPrice = 2500,
  salePrice = null,
  colors = [
    { label: "White Gold", hex: "#f5f5f0" },
    { label: "Obsidian", hex: "#1a1a1a" },
    { label: "Army", hex: "#4a5240" },
    { label: "Steel", hex: "#7b8fa1" },
  ],
  rating = 4.8,
  ratingCount = 128,
  badge = "LIMITED EDITION",
  onClick = null,
}) {
  const [liked, setLiked] = useState(false);
  const [activeColor, setActiveColor] = useState(0);

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  const formatPrice = (p) =>
    new Intl.NumberFormat("th-TH", { style: "decimal", minimumFractionDigits: 0 }).format(p);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');

        .gt-card {
          font-family: 'Barlow', sans-serif;
          width: 320px;
          background: #fafaf8;
          border: 1px solid #e8e4dc;
          position: relative;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }
        .gt-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }

        /* Image zone */
        .gt-img-wrap {
          position: relative;
          background: #efefeb;
          overflow: hidden;
          aspect-ratio: 4/5;
        }
        .gt-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .gt-card:hover .gt-img-wrap img {
          transform: scale(1.04);
        }

        /* Logo badge */
        .gt-logo-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
        }

        /* Product badge (LIMITED EDITION etc.) */
        .gt-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #1a1a1a;
          color: #c9a84c;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-align: center;
          padding: 7px 0 6px;
        }

        /* Heart */
        .gt-heart {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          background: rgba(255,255,255,0.85);
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .gt-heart:hover { transform: scale(1.15); background: #fff; }
        .gt-heart svg {
          transition: fill 0.2s, stroke 0.2s;
        }
        .gt-heart.liked svg { fill: #c0392b; stroke: #c0392b; }

        /* Info zone */
        .gt-info {
          padding: 16px 16px 20px;
        }

        /* Top row */
        .gt-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .gt-meta {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          letter-spacing: 1.8px;
          color: #8a8680;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* Color swatches */
        .gt-swatches {
          display: flex;
          gap: 7px;
          margin-bottom: 13px;
          align-items: center;
        }
        .gt-swatch {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          flex-shrink: 0;
          outline: none;
          box-sizing: border-box;
        }
        .gt-swatch:hover { transform: scale(1.2); }
        .gt-swatch.active {
          box-shadow: 0 0 0 2px #fafaf8, 0 0 0 3.5px #1a1a1a;
        }

        /* Title */
        .gt-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #1a1a1a;
          line-height: 1.1;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* Rating */
        .gt-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 12px;
        }
        .gt-stars {
          display: flex;
          gap: 1px;
        }
        .gt-star { color: #c9a84c; }
        .gt-star-empty { color: #d8d4cc; }
        .gt-rating-text {
          font-size: 11px;
          color: #8a8680;
          letter-spacing: 0.3px;
        }

        /* Price */
        .gt-price-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .gt-price {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.3px;
        }
        .gt-price-original {
          font-size: 14px;
          color: #aaa69e;
          text-decoration: line-through;
          font-weight: 400;
          font-family: 'Barlow', sans-serif;
        }
        .gt-price-sale {
          color: #c0392b;
        }
        .gt-currency {
          font-size: 14px;
          font-weight: 500;
          color: inherit;
          margin-right: 1px;
        }

        /* Divider */
        .gt-divider {
          height: 1px;
          background: #e8e4dc;
          margin: 12px 0;
        }
      `}</style>

      <div className="gt-card" onClick={onClick}>
        {/* Image Section */}
        <div className="gt-img-wrap">
          <div className="gt-logo-badge"><GT_LOGO /></div>

          <button
            className={`gt-heart${liked ? " liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
            aria-label="Add to favorites"
          >
            <Heart size={16} strokeWidth={2} />
          </button>

          <img src={image} alt={title} />

          {badge && <div className="gt-badge">{badge}</div>}
        </div>

        {/* Info Section */}
        <div className="gt-info">
          {/* Category + Sizes */}
          <div className="gt-top-row">
            <span className="gt-meta">{category}</span>
            <span className="gt-meta">{sizes}</span>
          </div>

          {/* Color Swatches */}
          <div className="gt-swatches">
            {colors.map((c, i) => (
              <button
                key={i}
                className={`gt-swatch${activeColor === i ? " active" : ""}`}
                style={{
                  background: c.hex,
                  border: `1.5px solid ${c.hex === "#f5f5f0" || c.hex === "#fafaf8" ? "#ccc" : c.hex}`,
                }}
                title={c.label}
                onClick={(e) => { e.stopPropagation(); setActiveColor(i); }}
                aria-label={c.label}
              />
            ))}
          </div>

          {/* Title */}
          <div className="gt-title">{title}</div>

          {/* Rating */}
          <div className="gt-rating">
            <div className="gt-stars">
              {stars.map((s, i) => (
                <Star
                  key={i}
                  size={13}
                  strokeWidth={1.5}
                  className={s.filled ? "gt-star" : "gt-star-empty"}
                  fill={s.filled ? "#c9a84c" : "none"}
                />
              ))}
            </div>
            <span className="gt-rating-text">
              {rating.toFixed(1)} ({ratingCount})
            </span>
          </div>

          <div className="gt-divider" />

          {/* Price */}
          <div className="gt-price-row">
            {salePrice ? (
              <>
                <span className="gt-price gt-price-sale">
                  <span className="gt-currency">฿</span>{formatPrice(salePrice)}
                </span>
                <span className="gt-price-original">฿{formatPrice(originalPrice)}</span>
              </>
            ) : (
              <span className="gt-price">
                <span className="gt-currency">฿</span>{formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}