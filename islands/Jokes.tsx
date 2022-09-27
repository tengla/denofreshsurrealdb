import { useState } from "preact/hooks";
import { Button } from "~/components/Button.tsx";

export default function Jokes(props: { initialJoke: string }) {
  const [joke, setJoke] = useState(props.initialJoke)
  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{joke}</p>
      <Button onClick={() => {
        fetch('/api/jokes/random').then(res => {
          res.text().then(text => {
            setJoke(text)
          })
        })
      }}>Fetch another joke</Button>
    </div>
  );
}
