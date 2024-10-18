import { ReactSlider } from 'react-slider';

export default function WaterRatioPanel() {
  return (
    <>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </>
  );
}
