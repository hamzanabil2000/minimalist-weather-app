import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
  isCelsius: boolean; // Added this prop to handle the unit toggle
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
    isCelsius, // Destructure the new prop
  } = props;

  const convertTemperature = (kelvin: number) => {
    const celsius = convertKelvinToCelsius(kelvin);
    if (isCelsius) {
      return Math.abs(celsius); // Use Math.abs() to ensure positive values
    } else {
      const fahrenheit = (celsius * 9) / 5 + 32;
      return Math.abs(Math.floor(fahrenheit)); // Use Math.abs() to ensure positive values and round to nearest integer
    }
  };
  

  return (
    <Container className="gap-4">
      {/* left */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatehrIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-5xl">
            {convertTemperature(temp ?? 0)}°{isCelsius ? "C" : "F"}
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>
              {convertTemperature(feels_like ?? 0)}°{isCelsius ? "C" : "F"}
            </span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      {/* right */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
