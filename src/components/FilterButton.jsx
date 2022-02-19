import React from 'react';
import PropTypes from 'prop-types';

FilterButton.propTypes = {
  // `buttonName` is the filter button name
  buttonName: PropTypes.string.isRequired,
  // `isPressed` determines if a button has been pressed
  isPressed: PropTypes.bool.isRequired,
  // `setFilterButton` sets the filter name to `filterName`
  setFilterButton: PropTypes.func.isRequired,
};

/**
 * Component | FilterButton
 */
function FilterButton(props) {
  console.info('+++++ Render FilterButton +++++');
  const { buttonName, isPressed, setFilterButton } = props;
  return (
    <button
      type="button"
      className="btn toggle-btn"
      // `aria-pressed` attribute indicates the current "pressed" state of a toggle button
      aria-pressed={isPressed}
      // execute `setFilterButton` on click to set `buttonName` to `filterName`
      onClick={() => setFilterButton(buttonName)}
    >
      <span className="visually-hidden">Show </span>
      <span>{buttonName}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default React.memo(FilterButton);
