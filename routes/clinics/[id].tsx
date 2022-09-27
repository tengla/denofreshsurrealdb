import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "twind";
import { Container } from "~/components/Container.tsx";
import { ClinicType } from "~/models/clinic.ts";

const scheme = "http";
const hostname = Deno.env.get("HOSTNAME") || "localhost";
const port = 8000;
const getHost = (port: number) => `${scheme}://${hostname}:${port}`;

type Data = {
  clinic: ClinicType
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const resp = await fetch(`${getHost(port)}/api/clinics/${ctx.params.id}`);
    const clinic = await resp.json();
    return ctx.render({ clinic })
  }
}
const FormField = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className={tw`my-4`}>
      <label className={tw`block text-gray-700 text-sm font-bold mb-2`}>{label}</label>
      <input
        className={tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
        value={value}
      />
    </div>
  )
}
export default function ClinicById(props: PageProps) {
  const { clinic } = props.data;
  return (
    <Container>
      <h1 className={tw`text-xl font-bold`}>Clinics 🏥</h1>
      <div className={tw`w-full max-w-md`}>
        <form className={tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
          <FormField label="Name" value={clinic.name} />
          <FormField label="Address" value={clinic.address} />
          <FormField label="Zip" value={clinic.zip} />
          <FormField label="Latitude" value={clinic.lat} />
          <FormField label="Longitude" value={clinic.lon} />
        </form>
      </div>
      <div>
        <a href={`/clinics`}>Tilbake</a>
      </div>
    </Container>
  )
}
