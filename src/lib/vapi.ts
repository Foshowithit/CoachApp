import Vapi from "@vapi-ai/web";

console.log("Initializing Vapi with API key:", process.env.NEXT_PUBLIC_VAPI_API_KEY ? "Present" : "Missing");

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
