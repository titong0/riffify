export function randomIdsSequence(ids: string[]) {
  const shuffledIds = shuffle(ids);
  return shuffledIds;
}

function shuffle<T extends Array<any>>(array: T) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const random = (seed: number) => {
  const x = Math.sin(seed++) * 100000;
  return x - Math.floor(x);
};

// duration is a string like
// 12:21 4:12 0:17 12:21:56
export const calculateStart = (duration: string | number) => {
  let secondsLong = 0;
  if (typeof duration === "number") {
    secondsLong = duration;
  } else {
    if (duration.length < 6) {
      const [minutes, seconds] = duration.split(":");
      secondsLong = parseInt(minutes) * 60 + parseInt(seconds);
    } else {
      const [hours, minutes, seconds] = duration.split(":");
      secondsLong = +hours * 60 * 60 + +minutes * 60 + +seconds;
    }
  }
  const minimumStart = Math.max(secondsLong - 16, 0);
  if (minimumStart === 0) return 0;

  return Math.floor(random(secondsLong) * minimumStart);
};
