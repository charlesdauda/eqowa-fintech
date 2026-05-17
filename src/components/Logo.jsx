const Logo = ({ src, size = 88, glow = true, alt = 'Eqowa Fintech' }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`object-contain ${glow ? 'drop-shadow-[0_0_24px_rgba(212,175,111,0.18)]' : ''}`}
    style={{ width: size, height: size }}
  />
);

export default Logo;