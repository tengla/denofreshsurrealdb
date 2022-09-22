
import { css } from "https://esm.sh/v95/twind@0.16.17/css";
import { apply, tw } from "https://esm.sh/v95/twind@0.16.17/twind";
import { JSX } from "preact/jsx-runtime";

type ContainerProps = {
  children: JSX.Element[]
}

export const Container = ({ children }: ContainerProps) => {
  const style = apply`container mx-auto pt-10 font-sans text-white h-screen ${css({
    'background-color': '#243c5a'
  })} hover:${css({
    'background-color': '#243c5ad9'
  })}`;
  return (
    <div className={tw`${style}`}>
      {children}
    </div>
  )
}