This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Primio

As a user, I want an engaging and interesting experience to interact with when determining what number I land on when playing the “Primio!” game.

The game is simple, a user presses a spin button and an animation similar to a slot machine/carousel/spinner plays and eventually lands on a number. If the number is Prime, the user wins, if its not prime they lose.

The application must:
Leverage the numbers 1-20
Display the numbers in a random order
Land squarely on the winning number
Animate a spin mechanic which begins quickly and progressively slows down before landing on the number
A distinguishable center or selector indicating to the user what number was landed on
A highlight mechanic to outline to the user where the center of the spinner is currently aligned (eg: numbers getting larger as if passing under a magnifying glass)
Align a sound with the spinner as it spins (think beeps and boops), you can find free sounds at (https://freesound.org/) 
Be able to respin an infinite number of times without having to refresh or rerender

## How to run

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
