
import { HandlerContext } from "$fresh/server.ts";
import { api, ClinicType } from '~/models/clinic.ts'

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response> {
    const $api = await api();
    try {
      const clinics = await $api.find(_ctx.params.id) as ClinicType[];
      const clinic = clinics[0];
      return new Response(JSON.stringify(clinic))
    } catch (err) {
      console.error(err);
      return new Response(err.message, {
        status: 500,
      })
    }
  }
}
