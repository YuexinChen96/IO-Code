import {DateRange} from 'react-date-range';
import {useState} from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Calendar=(props)=> {
    const [state, setState] = useState([
    {
        startDate: props.startDate,
        endDate: props.endDate,
        key: 'selection'
    }]);
    return (
        <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
    />
    );
}

export default Calendar;