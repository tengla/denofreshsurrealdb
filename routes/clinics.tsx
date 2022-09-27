import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "twind";
import { Container } from "~/components/Container.tsx";
import { ClinicType } from "~/models/clinic.ts";

const scheme = "http";
const hostname = Deno.env.get("HOSTNAME") || "localhost";
const port = 8000;
const getHost = (port: number) => `${scheme}://${hostname}:${port}`;

type Data = {
  clinics: ClinicType[]
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const resp = await fetch(`${getHost(port)}/api/clinics`);
    const clinics = await resp.json();
    return ctx.render({ clinics })
  }
}

export default function Home(props: PageProps) {
  return (
    <Container>
      <h1 className={tw`text-xl font-bold`}>Clinics 🏥</h1>
      <div>{props.data.clinics.map((clinic: ClinicType) => {
        return (
          <div className={
            tw`bg-white text-black rounded-lg shadow-lg p-4 my-4 cursor-pointer hover:shadow-xl`
          }>
            <a href={`/clinics/${clinic.id}`}>
              {clinic.name}, {clinic.address}
            </a>
          </div>
        )
      })}</div>
    </Container>
  )
}
