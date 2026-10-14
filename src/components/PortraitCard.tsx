import { portraits, profile } from "../data/siteContent";

export function PortraitCard() {
  return (
    <figure className="portrait-composition">
      <div className="portrait-frame">
        <picture>
          <source srcSet="/portrait-twitter.webp" type="image/webp" />
          <img
            src={portraits.twitter.src}
            alt={portraits.twitter.alt}
            width={736}
            height={736}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <figcaption>
        <span>{profile.name}</span>
        <span className="portrait-handle">@{profile.socialHandle}</span>
      </figcaption>
      <p className="portrait-note">
        A little curiosity.
        <br />
        <em>A lot of building.</em>
      </p>
    </figure>
  );
}
