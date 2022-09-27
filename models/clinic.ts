import { Static, Type } from "@sinclair/typebox"
import db from '~/models/db.ts';

export const Clinic = Type.Strict(Type.Object({
  id: Type.Optional(Type.String()),
  name: Type.String({ minLength: 5 }),
  address: Type.String({ minLength: 5 }),
  city: Type.String({ minLength: 2 }),
  zip: Type.String({ minLength: 4, maxLength: 4 }),
  phone: Type.Optional(Type.String()),
  lat: Type.Number(), // y
  lon: Type.Number(), // x
  location: Type.Optional(Type.Object({
    type: Type.Literal('Point'),
    coordinates: Type.Tuple([Type.Number(), Type.Number()]),
  })),
}, { additionalProperties: false }));

export type ClinicType = Static<typeof Clinic>

export const api = async () => {
  const _db = await db();
  return {
    db: _db,
    all() {
      return _db?.select("clinics");
    },
    async withinRadius(lat: number, lon: number, radius: number) {
      console.log(lat, lon, radius)
      const result = await _db?.query(`SELECT * FROM clinics WHERE geo::distance( location, (${lat}, ${lon}) ) < $radius;`, {
        radius
      });
      const clinics = result![0].result as ClinicType[];
      return clinics;
    },
    async find(id: string) {
      return await _db?.select(`${id}`);
    },
    create(clinic: ClinicType) {
      return _db?.create("clinics", {
        ...clinic,
        location: {
          type: "Point",
          coordinates: [clinic.lat, clinic.lon]
        }
      });
    }
  };
};