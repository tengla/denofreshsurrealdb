import Ajv from "ajv"
import { HandlerContext } from "$fresh/server.ts";
import { api, Clinic, ClinicType } from '~/models/clinic.ts'

const ajv = new Ajv({ allErrors: true })

export const handler = {
  async POST(req: Request, _ctx: HandlerContext) {
    const isJson = req.headers.get('Content-Type') === 'application/json';
    if (!isJson) {
      return new Response('Content-Type must be application/json', {
        status: 400,
      })
    }
    const clinic: ClinicType = await req.json()
    const validate = ajv.compile(Clinic)
    const valid = validate(clinic);
    if (!valid) {
      return new Response(JSON.stringify(validate.errors), {
        status: 400,
      })
    }
    const $api = await api();
    const createdJoke = await $api.create(clinic);
    return new Response(JSON.stringify(createdJoke), {
      status: 201,
      headers: {
        'content-type': 'application/json'
      }
    })
  },
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response> {
    const $api = await api();
    try {
      /* keyser: const clinics = await $api.withinRadius(
        59.908225613548936, 10.753445286528073, 1000); */
      /* bislett: const clinics = await $api.withinRadius(
        59.9262427092396, 10.72813282460096, 7000); */
      const clinics = await $api.all();
      return new Response(JSON.stringify(clinics))
    } catch (err) {
      console.error(err);
      return new Response(err.message, {
        status: 500,
      })
    }
  }
}
