import { forwardIntake } from "@/lib/intake/forward";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  return forwardIntake(request, "leads");
}
