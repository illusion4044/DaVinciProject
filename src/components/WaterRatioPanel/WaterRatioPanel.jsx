import ReactSlider from 'react-slider';
// import TodayListModal from '../TodayListModal/TodayListModal.jsx';

export default function WaterRatioPanel() {
  return (
    <>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
      {/* <div>
        <button onClick={() => {}}> + Add Water</button>
      </div> */}
    </>
  );
}
