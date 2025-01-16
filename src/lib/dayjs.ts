import extendedDayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import relativePlugin from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

extendedDayjs.extend(updateLocale);

extendedDayjs.extend(relativePlugin);

extendedDayjs.extend(isBetween);

extendedDayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "A minute",
    mm: "%dm",
    h: "An hour",
    hh: "%dh",
    d: "A day",
    dd: "%dd",
    M: "A month",
    MM: "%dm",
    y: "A year",
    yy: "%dy",
    D: "A day",
  },
});

export default extendedDayjs;

