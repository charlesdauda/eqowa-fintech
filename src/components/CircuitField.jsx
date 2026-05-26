import { useId } from 'react';

const NODES = [
  [12, 18], [28, 8], [44, 22], [62, 12], [78, 26], [92, 14],
  [8, 38], [22, 48], [38, 42], [54, 52], [70, 44], [86, 56], [96, 42],
  [14, 68], [30, 78], [48, 72], [64, 82], [80, 74], [94, 86],
  [6, 92], [24, 96], [42, 88], [58, 96], [76, 92], [88, 96],
];

const EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,6],[1,7],[2,8],[3,9],[4,10],[5,11],
  [6,7],[7,8],[8,9],[9,10],[10,11],[11,12],
  [6,13],[7,14],[8,15],[9,16],[10,17],[11,18],
  [13,14],[14,15],[15,16],[16,17],[17,18],
  [13,19],[14,20],[15,21],[16,22],[17,23],[18,24],
  [19,20],[20,21],[21,22],[22,23],[23,24],
];

const CircuitField = () => {
  const id = useId();
  const vignetteId = `vignette-${id}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={vignetteId} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(30,78,216,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="100" height="100" fill={`url(#${vignetteId})`} />

      <g stroke="rgba(30,78,216,0.09)" strokeWidth="0.08" fill="none">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}>
            <animate
              attributeName="stroke-opacity"
              values="0.3;1;0.3"
              dur={`${4 + (i % 5)}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.13) % 3}s`}
            />
          </line>
        ))}
      </g>

      <g fill="rgba(10,30,63,0.30)">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.18">
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur={`${3 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.2) % 2}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default CircuitField;