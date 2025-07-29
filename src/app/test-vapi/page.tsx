"use client";

import { Button } from "@/components/ui/button";
import { vapi } from "@/lib/vapi";
import { useState } from "react";

export default function TestVapiPage() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        console.log("Testing Vapi call...");
        
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: "Test User",
            user_id: "test-123",
          },
        });
      } catch (error) {
        console.error("Vapi test failed:", error);
        alert(`Test failed: ${error}`);
        setConnecting(false);
      }
    }
  };

  // Event listeners
  vapi
    .on("call-start", () => {
      setCallActive(true);
      setConnecting(false);
      console.log("Call started successfully!");
    })
    .on("call-end", () => {
      setCallActive(false);
      setConnecting(false);
      console.log("Call ended");
    })
    .on("error", (error) => {
      console.error("Vapi error:", error);
      setCallActive(false);
      setConnecting(false);
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Vapi Test Page</h1>
      
      <div className="space-y-4 text-center">
        <p>API Key: {process.env.NEXT_PUBLIC_VAPI_API_KEY ? "✅ Present" : "❌ Missing"}</p>
        <p>Workflow ID: {process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID ? "✅ Present" : "❌ Missing"}</p>
        
        <Button
          onClick={toggleCall}
          disabled={connecting}
          className={callActive ? "bg-red-500" : "bg-green-500"}
        >
          {connecting ? "Connecting..." : callActive ? "End Call" : "Start Test Call"}
        </Button>
        
        <p className="text-sm text-gray-500">
          Status: {callActive ? "Active" : connecting ? "Connecting" : "Ready"}
        </p>
      </div>
    </div>
  );
}