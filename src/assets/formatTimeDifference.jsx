import { differenceInMinutes, differenceInSeconds, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';


export default function formatTimeDifference(created) {
  const currentTime = new Date();
  const timeDifferenceYears = differenceInYears(currentTime, created?.toDate());

  if (timeDifferenceYears >= 1) {
    return `${timeDifferenceYears} year${timeDifferenceYears > 1 ? 's' : ''} ago`;
  }

  const timeDifferenceDays = differenceInDays(currentTime, created?.toDate());

  if (timeDifferenceDays >= 1) {
    return `${timeDifferenceDays} day${timeDifferenceDays > 1 ? 's' : ''} ago`;
  }

  const timeDifferenceHours = differenceInHours(currentTime, created?.toDate());

  if (timeDifferenceHours < 1) {
    const timeDifferenceMinutes = differenceInMinutes(currentTime, created?.toDate());
    if (timeDifferenceMinutes < 1) {
      const timeDifferenceSeconds = differenceInSeconds(currentTime, created?.toDate());
      if (timeDifferenceSeconds < 5) {
        return 'Just now';
      } else {
        return `${timeDifferenceSeconds} second${timeDifferenceSeconds > 1 ? 's' : ''} ago`;
      }
    } else {
      return `${timeDifferenceMinutes} minute${timeDifferenceMinutes > 1 ? 's' : ''} ago`;
    }
  } else {
    return `${timeDifferenceHours} hour${timeDifferenceHours > 1 ? 's' : ''} ago`;
  }
}

// ...
