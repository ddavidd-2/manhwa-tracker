
/* format date */
export function relativeDate(date) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  const diff = Math.round((new Date() - new Date(date)) / 1000);

  if (diff < 30) {
    return "just now";
  } else if (diff < minute) {
    return diff + " seconds ago";
  } else if (diff < 2 * minute) {
    return "a minute ago";
  } else if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  } else if (diff < 2 * hour) {
    return "an hour ago";
  } else if (diff < day) {
    return Math.floor(diff / hour) + " hours ago";
  } else if (diff < day * 2) {
    return "a day ago";
  } else if (diff < week) {
    return Math.floor(diff / day) + " days ago";
  } else if (diff < 2 * week) {
    return "a week ago";
  } else if (diff < month) {
    return Math.floor(diff / week) + " weeks ago";
  } else if (diff < 2 * month) {
    return "a month ago"
  } else if (diff < year) {
    return Math.floor(diff / month) + " months ago";
  } else if (diff < 2 * year) {
    return "a year ago"
  } else {
    return Math.floor(diff / year) + " years ago";
  }
}