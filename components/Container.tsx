
import { apply, tw } from "twind";
import { JSX } from "preact/jsx-runtime";

type ContainerProps = {
  children: JSX.Element[]
}

export const Container = ({ children }: ContainerProps) => {
  const style = apply`container mx-auto pt-10 font-sans text-black h-screen`;
  return (
    <div className={tw`${style}`}>
      {children}
    </div>
  )
}