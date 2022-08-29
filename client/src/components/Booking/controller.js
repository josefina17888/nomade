const getDatesInRange = (checkIn, checkOut) => {
  console.log(checkIn)
  var start = new Date(checkIn);
  var end = new Date(checkOut);
  var nights = new Date(start);
  const dates = [];
  if (start.toDateString() === end.toDateString()) {
      console.log('ENTRAMOS')
    dates.push(start.toDateString());
    return dates;
  } else {
    while (nights < end) {
      dates.push(nights.toDateString());
      nights.setDate(nights.getDate() + 1);
    }
    return dates;
  }
};

export default getDatesInRange;
