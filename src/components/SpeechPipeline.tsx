const stages = [
  { key: "ASR", title: "Recognize", detail: "Whisper", number: "01" },
  { key: "MT", title: "Translate", detail: "EN → HI", number: "02" },
  { key: "TTS", title: "Speak", detail: "Synthesis", number: "03" },
];

export function SpeechPipeline() {
  return (
    <figure
      className="speech-schematic"
      aria-label="Illustrative Speech Relay architecture: audio over WebRTC through recognition, translation, and synthesis"
    >
      <figcaption>
        <span className="eyebrow">Speech Relay / Signal path</span>
        <span className="schematic-label">Architecture illustration</span>
      </figcaption>
      <div className="signal-input" aria-hidden="true">
        <div className="waveform">
          {[
            8, 17, 25, 13, 31, 46, 23, 34, 56, 38, 22, 42, 28, 13, 21, 8, 18,
            32, 48, 24, 35, 54, 29, 19, 38, 24, 14, 9,
          ].map((height, i) => (
            <span key={i} style={{ height }} />
          ))}
        </div>
        <span>
          Audio in <span>via WebRTC</span>
        </span>
      </div>
      <ol className="pipeline-stages">
        {stages.map((stage) => (
          <li key={stage.key}>
            <span className="stage-number">{stage.number}</span>
            <strong>{stage.key}</strong>
            <span>{stage.title}</span>
            <small>{stage.detail}</small>
          </li>
        ))}
      </ol>
      <div className="pipeline-footer">
        <span>
          <span className="small-dot" aria-hidden="true" />
          Shared ASR · multiple listeners
        </span>
        <span>Audio out ↗</span>
      </div>
    </figure>
  );
}
