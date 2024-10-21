import { ReactSlider } from 'react-slider';
import TodayListModal from 'components/TodayListModal/TodayListModal.jsx';

export default function WaterRatioPanel() {
  return (
    <>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
      <button onclick={TodayListModal}> +Add Water</button>
    </>
  );
}
