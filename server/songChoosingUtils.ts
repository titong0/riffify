export const selectToday = (length: number, today: Date) => {
  const startDate = new Date("1/1/2000");

  let todaysIdx = Math.abs(dayDiff(startDate, today));

  // have a different order once you run out of songs
  if (todaysIdx / length > 1) {
    todaysIdx = todaysIdx % length;
    todaysIdx = randomSecuence(length)[todaysIdx];
  }
  const allDays = randomSecuence(length);
  return { today: allDays[todaysIdx], fullSecuence: allDays };
};

const randomSecuence = (length: number) => {
  const nums = Array.from({ length: length }, (_, idx) => idx);
  let seed = length;
  let m = nums.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE
    t = nums[m];
    nums[m] = nums[i];
    nums[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return nums;
};

const random = (seed: number) => {
  const x = Math.sin(seed++) * 100000;
  return x - Math.floor(x);
};
const dayDiff = (startDate: Date, secondDate: Date) => {
  const difference = startDate.getTime() - secondDate.getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};

// duration is a string like
// 12:21 4:12 0:17 12:21:56
export const calculateStart = (duration: string) => {
  let secondsLong = 0;
  if (duration.length < 6) {
    const [minutes, seconds] = duration.split(":");
    secondsLong = parseInt(minutes) * 60 + parseInt(seconds);
  } else {
    const [hours, minutes, seconds] = duration.split(":");
    secondsLong = +hours * 60 * 60 + +minutes * 60 + +seconds;
  }
  const allowedRange = secondsLong - 16;
  if (allowedRange < 0) {
    return 0;
  }
  return Math.floor(random(secondsLong) * allowedRange);
};
