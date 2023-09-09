import moment from 'moment';

export default function formatTime(created) {
  const createdTime = moment(created?.toDate());

  return createdTime.fromNow(true);
}
