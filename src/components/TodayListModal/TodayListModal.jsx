

export default function TodayListModal() {
  return (
    <div>
      <h1>Edit the entered amount of water</h1>

      {isFirstRecord ? <p>No notes yet</p> : null}

      <div>
        <svg>
          <use href=""></use>
        </svg>
        <p>{selectedItem ? selectedItem.amount : 0} ml</p>
        <p>{selectedItem ? selectedItem.time : '00:00'}</p>
      </div>

      <div>
        <h2>Correct entered data:</h2>
        <p>Amount of water:</p>
        <div>
          <button>-</button>
          <span> ml</span>
          <button>+</button>
        </div>
      </div>
      <div>
        <label>Recording time:</label>
        <input />
      </div>
      <div>
        <h2>Enter the value of the water used:</h2>
        <input />
      </div>

      <div>
        <p>{count} ml</p>
        <button onClick={onSaveClick} disabled={isSaveDisabled}>
          Save
        </button>
      </div>
    </div>
  );
}
