import clientPromise from "@/libs/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { JWTPayload, JWTVerifyResult, jwtVerify } from "jose";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  // EDIT 1 NOTE
  try {
    const client: MongoClient = await clientPromise;
    const mySession: RequestCookie | undefined = cookies().get("mySession");
    const id = params.id;
    let secret_key: Uint8Array = new TextEncoder().encode(
      process.env.JWT_SECRET
    );
    const data = await req.json();

    if (mySession === undefined) {
      return Response.json({ Error: "Account doesn't exist" }, { status: 401 });
    }

    const value: JWTVerifyResult<JWTPayload> = await jwtVerify(
      mySession.value,
      secret_key
    );

    if (typeof value.payload.uid !== "string") {
      throw new Error();
    }

    const db: Db = client.db(value.payload.uid);

    const edit_note = {
      title: data.title,
      content: data.content,
      create_date: new Date().toLocaleString(),
      expire_date: data.expire_date,
    };

    const edit_note_edited = await db
      .collection("notes")
      .updateOne({ _id: new ObjectId(id) }, { $set: edit_note });

    return Response.json(edit_note_edited.acknowledged, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ Error: error.message }, { status: 500 });
    }
  }
}
