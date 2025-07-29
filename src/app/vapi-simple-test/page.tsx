"use client";

import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function VapiSimpleTestPage() {
  const [status, setStatus] = useState("Ready");
  const [vapi, setVapi] = useState<any>(null);

  useEffect(() => {
    // Initialize Vapi
    const vapiInstance = new Vapi("88a56cdf-a0ed-42b5-a090-713ed7c58364");
    setVapi(vapiInstance);
    setStatus("Vapi initialized");

    // Cleanup
    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  const startCall = async () => {
    if (!vapi) {
      setStatus("Vapi not initialized");
      return;
    }

    try {
      setStatus("Starting call...");
      
      // Set up event listeners
      vapi.on("call-start", () => {
        console.log("Call started!");
        setStatus("Call Active ✓");
      });

      vapi.on("call-end", () => {
        console.log("Call ended");
        setStatus("Call Ended");
      });

      vapi.on("error", (error: any) => {
        console.error("Vapi error:", error);
        setStatus(`Error: ${JSON.stringify(error)}`);
      });

      vapi.on("speech-start", () => {
        console.log("Assistant speaking");
      });

      vapi.on("speech-end", () => {
        console.log("Assistant stopped speaking");
      });

      // Start the call with assistant (not workflow)
      const assistantId = "733fce9e-f751-4257-a23b-8022716de930";
      console.log("Calling assistant:", assistantId);
      console.log("Note: Workflows are for phone calls, Assistants are for web calls");
      
      await vapi.start(assistantId);
      
    } catch (error: any) {
      console.error("Failed to start call:", error);
      setStatus(`Failed: ${error.message}`);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
      setStatus("Call ended by user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Vapi Simple Test</h1>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">Status:</p>
          <p className="text-lg font-medium">{status}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Assistant ID:</p>
          <p className="text-xs font-mono">733fce9e-f751-4257-a23b-8022716de930</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">API Key:</p>
          <p className="text-xs font-mono">88a56cdf-a0ed-42b5-a090-713ed7c58364</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={startCall}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Start Call
          </button>
          
          <button
            onClick={endCall}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}