import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import moment from 'moment-timezone';



export default function MainContent() {


  //STATES

  const [nextPrayerIndex, setnextPrayerIndex] = useState(1)
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",

  });

  const [remainingTime, setReminingTime] = useState("");
  //const [day,setDay]=useState()

  const [city, setCity] = useState(
    {
      displayName: "London",
      apiName: "London",
      code: "GB",
       timezone: "Europe/London"
    }
  )



  const avilabelCities = [
    {
      displayName: "Istanbul",
      apiName: "Istanbul",
      code: "TR",
       timezone: "Europe/Istanbul"
    },
    {
      displayName: "London",
      apiName: "London",
      code: "GB",
      timezone: "Europe/London"
      
    },
    {
      displayName: "Damascus",
      apiName: "Damascus",
      code: "SY",
       timezone: "Asia/Damascus"
    }
  ]

  const prayersArray = [
    { key: "Fajr", displayName: "Fajr" },
    { key: "Dhuhr", displayName: "Dhuhr" },
    { key: "Asr", displayName: "Asr" },
    { key: "Maghrib", displayName: "Maghrib" },
    { key: "Isha", displayName: "Isha" }
  ]

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=${city.code}&city=${city.apiName}`);
    console.log(response.data.data.timings)
    setTimings(response.data.data.timings);

  };

  useEffect(() => {

    const fetchTimings = async () => {
      await getTimings();
    };

    fetchTimings();


  }, [city])

  const setupCountdownTimer = () => {
    if (!timings) return;   // <-- VERY IMPORTANT

    const momentNow = moment().tz(city.timezone);
    let PrayerIndex = 2;

    if (momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Duhur"], "hh:mm"))) {
      PrayerIndex = 1

    }
    else if (momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))) {
      PrayerIndex = 2;

    }
    else if (momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))) {
      PrayerIndex = 3;

    }
    else if (momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))) {
      PrayerIndex = 4;

    }

    else {
      PrayerIndex = 0;

    }
    setnextPrayerIndex(PrayerIndex)
    // now after knowing what the next prayer is we can set the countdown timer by geting the prayers time

    const nextPrayerObjext = prayersArray[PrayerIndex]
    const nextPrayerTime = timings[nextPrayerObjext.key]
    const nextPrayertimeMoment = moment(nextPrayerTime, "hh:mm")

    let remaningTime = moment(nextPrayerTime, "hh:mm").diff(momentNow)//moment objecte dondurmek 


    if (remaningTime < 0) {

      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayertimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remaningTime = totalDiffernce
    }

    console.log("remanninn", remaningTime)


    const durationRemainingTime = moment.duration(remaningTime)


    setReminingTime(`${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`);
    console.log("erinjcd", durationRemainingTime.hours(),
      durationRemainingTime.minutes())





    console.log("nextprayertime", nextPrayerTime)
    console.log(momentNow.isBefore(moment(timings["Fajr"], "hh:mm")));
  };




  const day = useMemo(() => moment().tz(city.timezone).format("MMM Do YY | h:mm a")
  ,[city]);





  useEffect(() => {
    if (!timings) return;

    let interval = setInterval(() => {
      console.log("call timer");
      setupCountdownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timings]);


  //const data = await axios.git("https://api.aladhan.com/v1/timingByCity?country=SA&city=Riyadh")


  const handleCityChange = (event) => {
    const cityObject = avilabelCities.find((city) => {
      return city.apiName == event.target.value
    })
    console.log(event.target.value);
    setCity(cityObject)
  };

  return (
    <>
      {/* top row */}
      <Grid container style={{ background: "" }} >
        <Grid size={5}>
          <div>
            <h4>{day}</h4>
            <h2>{city.displayName}</h2>
            <h2>{ }</h2>
          </div>
        </Grid>
        <Grid size={5}>
          <div>
            <h4>  Time remaining for {prayersArray[nextPrayerIndex].displayName} prayer</h4>
            <h2>{remainingTime}</h2>
          </div>
        </Grid>

        <Grid size={2}>
          <div>
            <Stack direction="row" justifyContent="left" style={{ marginTop: "30px" }} >
              <FormControl style={{ width: "20%" }}>
                <InputLabel id="demo-simple-select-label">London</InputLabel>
                <Select
                  style={{ color: "white", width: "150px" }}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  //value={age}
                  onChange={handleCityChange}
                  label="Age"
                >
                  {avilabelCities.map((city) => {
                    return (
                      <MenuItem value={city.apiName} key={city.apiName}>
                        {city.displayName}</MenuItem>
                    );
                  })}


                </Select>
              </FormControl>
            </Stack>
          </div>
        </Grid>

      </Grid>
      {/* =top row= */}
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* pray card */}
      <Stack direction="row" spacing={1} style={{
        marginTop: "10px"
      }}>
        <Prayer name="Fajr" time={timings.Fajr} image="https://tse1.explicit.bing.net/th/id/OIP.jCQUnv7J0wMmbCAbvYn56gHaE6?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" />
        <Prayer name="Dhuhr" time={timings.Dhuhr} image="https://tse3.mm.bing.net/th/id/OIP.26QlDtV9KicKToRkuKdpiAHaE6?rs=1&pid=ImgDetMain&o=7&rm=3" />
        <Prayer name="Asr" time={timings.Asr} image="https://imgeng.jagran.com/images/2024/feb/ratha-saptami-2024-date1708059785421.jpg" />
        <Prayer name="Maghrib" time={timings.Maghrib} image="https://seekersguidance.org/wp-content/uploads/2023/11/Sunset-Maghrib-Time.jpg" />
        <Prayer name="Isha" time={timings.Isha} image="https://moon.nasa.gov/system/news_items/main_images/56_176_moon_2018-04-23-Tom_Campbell_1600.jpg" />
      </Stack>
      {/* =pray card= */}
      {/* select */}


      {/* =select= */}
    </>
  );
}
