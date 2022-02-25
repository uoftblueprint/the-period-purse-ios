import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import {GETsymptomsForDate, getCalendarByYear, getSymptomsFromCalendar}  from '../utils/helpers';
import CycleService, {getNextPeriodEnd} from './CycleService';
import Testing from './Testing';


export default function DummyTest() {
  const [donutPercent, setDonutPercent] = useState(0.3)
  return (
    <View>
      <Text style={{height:50}}>
        BRUH
      </Text>
      <Button
        title="Post Cycle"
        onPress={() => {
          CycleService.PostCycleDonutPercent(donutPercent);
          // setDonutPercent(donutPercent + 0.1);
        }}/>
      <Button
        title="Post average Period length"
        onPress={() => {
          // CycleService.PostCycleDonutPercent(donutPercent);
          Testing.PostAveragePeriodLength();
        }}/>
      <Button
        title="Post average Cycle length"
        onPress={() => {
          Testing.PostAverageCycleLength();
        }}/>
      <Button
        title="average Period length"
        onPress={() => {
          CycleService.GetAveragePeriodLength().then(data => console.log(data));
        }}
        />
      <Button
        title="average Cycle length"
        onPress={() => {
          CycleService.GetAverageCycleLength().then(data => console.log(data));
        }}
        />
      <Button
        title = "Post calendar off period today"
        onPress={() => {
          Testing.PostDummyCalendarCalendarOffPeriodToday();
        }}
        />
      <Button
        title = "Post calendar on period today"
        onPress={() => {
          Testing.PostDummyCalendarOnPeriod();
        }}
        />
      <Button
        title = "Post calendar where period stretches across month"
        onPress={() => {
          Testing.PostDummyCalendarOverMonth();

        }}/>
      <Button
        title = "Post calendar where period stretches across 2021-2022"
        onPress={() => {
          Testing.PostDummyCalendarOverYear();

        }}/>
      <Button
        title = "Clear Calendar"
        onPress={() => {
          Testing.ClearCalendar();
        }}/>
      <Button
        title = "Clear Cycle Donut"
        onPress={() => {
          Testing.ClearCycleDonut();
        }}/>
      <Button
        title = "get symptoms"
        onPress={() => {
          // months are zero index
          let date = new Date();
          GETsymptomsForDate(date.getDate(), date.getMonth()+1, date.getFullYear()).then(data => console.log(data));
        }}/>
      <Button
        title = "get period day"
        onPress={() => {
          CycleService.GetPeriodDay().then(data => console.log(data));
        }}
        />
      <Button
        title="Get most recent period start day"
        onPress={() => {
          CycleService.GetMostRecentPeriodStartDay().then(data => console.log(data));
        }}/>
      <Button
        title="Get next period end relative to Dec 27 2022 "
        onPress={() => {
          getNextPeriodEnd(new Date("12/27/2022")).then(data => console.log(data));
        }}/>

      <Button
        title = "get cycle donut percent"
        onPress={() => {
          CycleService.GetCycleDonutPercent().then(data => console.log(data));
        }}
        />
      <Button
        title = "get cycle History"
        onPress={() => {
          CycleService.GetCycleHistoryByYear(2022).then(data => console.log(data));
        }}
        />
      <Button
        title = "get calendars"
        onPress={() => {
          getCalendarByYear(2022).then(data => console.log(data));
        }}
        />
      <Button
        title = "get symptoms for Dec 25th"
        onPress={() => {
          let date = new Date();
          getCalendarByYear(2022).then(calendar => getSymptomsFromCalendar(calendar,25, 12, 2022).then(data => console.log(data)));
        }}
        />

    </View>
  )

}
