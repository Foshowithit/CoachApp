"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TestVoicePage() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const startCall = async () => {
    try {
      setConnecting(true);
      
      // Check microphone permissions first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("✅ Microphone access granted");
        stream.getTracks().forEach(track => track.stop());
      } catch (micError) {
        console.error("❌ Microphone access denied:", micError);
        alert("Please allow microphone access");
        setConnecting(false);
        return;
      }
      
      // Import Vapi dynamically to avoid SSR issues
      const Vapi = (await import("@vapi-ai/web")).default;
      
      console.log("🔑 API Key:", process.env.NEXT_PUBLIC_VAPI_API_KEY?.substring(0, 8) + "...");
      console.log("🆔 Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
      
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

      // Event listeners with detailed logging
      vapi.on("call-start", () => {
        console.log("✅ Call started successfully!");
        setCallActive(true);
        setConnecting(false);
      });
      
      vapi.on("call-end", () => {
        console.log("📞 Call ended");
        setCallActive(false);
        setConnecting(false);
      });
      
      vapi.on("error", (error) => {
        console.error("❌ Vapi error details:", JSON.stringify(error, null, 2));
        console.error("❌ Error type:", typeof error);
        console.error("❌ Error keys:", Object.keys(error || {}));
        setCallActive(false);
        setConnecting(false);
        alert(`Vapi Error: ${JSON.stringify(error)}`);
      });

      vapi.on("message", (message) => {
        console.log("📨 Vapi message:", message);
      });

      // Start the call with workflow
      console.log("🚀 Starting Vapi call with workflow...");
      console.log("🔄 Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
      
      // Use assistant ID with detailed logging
      console.log("🤖 Using Assistant ID:", process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
      
      // Add error handling for connection
      vapi.on("error", (error) => {
        console.log("📡 Connection error:", error);
      });
      
      const result = await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
      console.log("📞 Start result:", result);
      
    } catch (error) {
      console.error("💥 Failed to start call:", error);
      console.error("💥 Error stack:", error.stack);
      setConnecting(false);
      alert(`Call failed: ${error.message || error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Voice Call Test</h1>
      
      <div className="space-y-4 text-center max-w-md">
        <div className="space-y-2">
          <p>API Key: {process.env.NEXT_PUBLIC_VAPI_API_KEY ? "✅ Present" : "❌ Missing"}</p>
          <p>Workflow ID: {process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID ? "✅ Present" : "❌ Missing"}</p>
          <p className="text-sm text-gray-500">New ID: {process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID}</p>
        </div>
        
        <Button
          onClick={startCall}
          disabled={connecting || callActive}
          className={`w-40 ${callActive ? "bg-green-500" : connecting ? "bg-yellow-500" : "bg-blue-500"}`}
          size="lg"
        >
          {connecting ? "Connecting..." : callActive ? "Call Active ✓" : "Start Voice Call"}
        </Button>
        
        <p className="text-sm">
          Status: {callActive ? "🟢 Active" : connecting ? "🟡 Connecting" : "⚪ Ready"}
        </p>
        
        <div className="text-xs text-gray-500 mt-4">
          <p>This bypasses Clerk authentication to test Vapi directly</p>
        </div>
      </div>
    </div>
  );
}