//get current formatted date
export const CurrentDate = () => {
  const date = new Date();
  const day = date.getDate(); // date
  const month = date.toLocaleString("default", { month: "short" }); //month
  const year = date.getFullYear(); //full year

  //suffix for the date
  let suffix;
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  return `${day}${suffix} ${month}, ${year}`;
};

//get formatted all dates
export const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate(); // date
  const month = date.toLocaleString("default", { month: "short" }); //month

  //suffix for the date
  let suffix;
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  return `${day}${suffix} ${month}`;
};

// function for duedate
export const isPassDueDate = (dueDate) => {
  const now = new Date();
  const taskDate = new Date(dueDate);
  return taskDate < now;
};
