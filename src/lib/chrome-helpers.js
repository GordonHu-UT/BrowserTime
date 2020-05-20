/* eslint-disable no-plusplus */
// See https://developer.chrome.com/extensions/history
import {
  getLastHour,
  getToday,
  getYesterday,
  getLastSeven,
  getLastFourteen,
  getLastThirty,
  getCustom,
} from './millisecond-helpers';

// return the history search parmaters
export const getSearchParams = (
  searchText,
  range,
  customRange,
  maxResults,
) => {
  let start;
  let end;
  let yesterday;
  let custom;

  // use millisecond helper fns to get start and end milliseconds
  switch (range) {
    case 'Hour':
      start = getLastHour();
      break;
    case 'Today':
      start = getToday();
      break;
    case 'Yesterday':
      yesterday = getYesterday(customRange.start, customRange.end);
      start = yesterday.start;
      end = yesterday.end;
      break;
    case 'Seven':
      start = getLastSeven();
      break;
    case 'Fourteen':
      start = getLastFourteen();
      break;
    case 'Thirty':
      start = getLastThirty();
      break;
    default:
      custom = getCustom(customRange.start, customRange.end);
      start = custom.start;
      end = custom.end;
  }

  const searchParams = {
    text: searchText,
    maxResults,
    startTime: start,
  };

  if (end) {
    searchParams.endTime = end;
  }

  return searchParams;
};

export const searchHistory = (queryObject) => new Promise((resolve, reject) => {
  chrome.history.search({
    ...queryObject,
  }, (items, error) => {
    if (error) reject(error);
    resolve(items);
  });
});

// uses the lastVisitTime of each item as the start and end time in order to delete 1 item at a time
export const deleteHistoryItems = (itemsToDelete) => new Promise((resolve, reject) => {
  try {
    let startTime;
    let endTime;
    for (let i = 0; i < itemsToDelete.lenght; i++) {
      startTime = itemsToDelete[i].lastVisitTime;
      endTime = itemsToDelete[i].lastVisitTime;
      chrome.history.deleteRange({ startTime, endTime }, () => console.log('deleted item'));
    }
    resolve();
  } catch (error) {
    reject(error);
  }
});

// delete entire user history
export const deleteAllHistory = () => new Promise((resolve, reject) => {
  try {
    chrome.history.deleteAll(() => resolve());
  } catch (error) {
    reject(error);
  }
});
