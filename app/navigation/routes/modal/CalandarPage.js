import {View_CenterModal} from '@templates/defaultComps';
import {_useNavFunctions} from '@hooks/navigationHook';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';

function CalendarPage() {
  const route = useRoute();
  const {_getCurParam, _goBack} = _useNavFunctions();
  const {onDaySelect} = _getCurParam();
  const [selected, setSelected] = useState('');

  return (
    <View_CenterModal>
      <Calendar
        theme={{
          selectedDayTextColor: 'white',
          selectedDayBackgroundColor: '#62E38C',
        }}
        markedDates={{
          [selected]: {selected: true},
        }}
        onDayPress={day => {
          if (selected === day.dateString) {
            console.log('day selecte : ', day);
            onDaySelect(day.timestamp);
            _goBack();
          } else {
            console.log('first select : ', day);
            setSelected(day.dateString);
          }
        }}
      />
    </View_CenterModal>
  );
}

export default CalendarPage;
