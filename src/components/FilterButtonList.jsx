import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from './FilterButton';

FilterButtonList.propTypes = {
  // `filterNameList` is an array of filter name
  filterNameList: PropTypes.arrayOf(PropTypes.string).isRequired,
  // `filterName` is filter name
  filterName: PropTypes.string.isRequired,
  // `setFilterButton` sets the filter name to `filterName`
  setFilterButton: PropTypes.func.isRequired,
};

/**
 * Component | FilterButtonList
 */
function FilterButtonList(props) {
  console.info('+++++ Render FilterButtonList +++++');
  const { filterNameList, filterName, setFilterButton } = props;
  return (
    <div className="filters btn-group stack-exception">
      {filterNameList.map((ele) => {
        const key = ele.toLowerCase();
        // `isPressed` determines if a button has been pressed
        const isPressed = ele === filterName;
        return (
          <FilterButton
            key={key}
            buttonName={ele}
            isPressed={isPressed}
            setFilterButton={setFilterButton}
          />
        );
      })}
    </div>
  );
}

export default React.memo(FilterButtonList);
