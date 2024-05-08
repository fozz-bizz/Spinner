import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { Slice } from "../components/Slice";
import { SpinPie } from "../types/SpinPie";
import { colorFor } from "../utils/colors";
import { getRandomSortedNumbers } from "../utils/numbers";

const Home: NextPage = () => {
  const spinner = useRef<SVGGElement>(null);
  const [spinPieValues, setSpinPieValues] = useState<number[]>([]);
  const [chosen, setChosen] = useState<SpinPie>();
  const [showChosen, setShowChosen] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [{ height, width }, setDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 450, width: 450 });
  const radius = width / 2;

  const interval = (number: number) => (2 * Math.PI) / number;
  const slices = (number: number): SpinPie[] => {
    const array = Array.from(Array(number).keys()).map((index) => {
      return {
        value: spinPieValues[index],
        minAngle: index * interval(number),
        maxAngle: (index + 1) * interval(number)
      };
    });

    return array;
  };

  const startSpinning = () => {
    setSpinning(true);
    setShowChosen(false);
    const winnerIndex = Math.floor(Math.random() * spinPieValues.length);
    const {
      value,
      minAngle: min,
      maxAngle: max
    } = slices(spinPieValues.length)[winnerIndex];
    const angle = ((Math.random() * (max - min) + min) * 180) / Math.PI + 180;
    const winner = { value, minAngle: angle, maxAngle: angle };

    setChosen(winner);
  };

  const finishSpinning = () => {
    setSpinning(false);
    if (spinner.current) {
      spinner.current.style.transform = `rotate(${chosen?.maxAngle}deg)`;
      spinner.current.classList.remove(styles.rotating);
      setShowChosen(true);
    }
  };

  const setSVGDimensions = ({ matches }: { matches: boolean }) => {
    if (matches) {
      setDimensions({ height: 350, width: 350 });
    } else {
      setDimensions({ height: 450, width: 450 });
    }
  };

  useEffect(() => {
    if (spinner.current && chosen !== undefined) {
      spinner.current.style.transform = `rotate(${
        360 * 10 + chosen.maxAngle
      }deg)`;
      spinner.current.classList.add(styles.rotating);
    }
  }, [chosen]);

  useEffect(() => {
    setSpinPieValues(getRandomSortedNumbers(20));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    setSVGDimensions(query);

    query.addEventListener("change", setSVGDimensions);
    return () => query.removeEventListener("change", setSVGDimensions);
  }, []);

  const resetspinner = () => {
    if (spinner.current) {
      spinner.current.style.transform = "rotate(0deg)";
      spinner.current.classList.remove(styles.rotating);
    }
  };

  const reset = () => {
    setChosen(undefined);
    resetspinner();
    setShowChosen(true);
    setSpinPieValues(getRandomSortedNumbers(20));
  };

  return (
    <>
      <Head>
        <title>spinner</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <h1 className="h-24 text-8xl dark:text-white">
          {showChosen && chosen?.value}
        </h1>
        <svg height={height + 50} width={width}>
          <g transform={`matrix(1 0 0 1 ${radius} ${(height + 50) / 2})`}>
            <circle cx="0" cy="0" r={radius - 5} fill={colorFor(0)} />
            <g ref={spinner} onTransitionEnd={finishSpinning}>
              {slices(spinPieValues.length).map((slice, index) => (
                <Slice
                  key={index}
                  spinPie={slice}
                  index={index}
                  radius={radius}
                />
              ))}
            </g>
          </g>
          <path
            d={`M${radius - 10} 0 L${radius} 30 L${radius + 10} 0 Z`}
            fill="darkgray"
            stroke="black"
          />
        </svg>
        <div className="flex flex-col w-64 mb-2 items-center">
          <button
            onClick={startSpinning}
            disabled={spinPieValues.length < 2 || spinning}
            className="disabled:bg-gray-100 disabled:text-gray-400 rounded bg-sky-100 hover:bg-sky-300 w-full p-2 my-2 text-4xl"
          >
            Spin
          </button>
          <button
            onClick={reset}
            disabled={spinPieValues.length === 0 || spinning}
            className="disabled:bg-gray-100 disabled:text-gray-400 rounded bg-red-100 hover:bg-red-300 w-full my-2"
          >
            Reset
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
