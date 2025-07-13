import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  async function handleRecording() {
    if (!isRecordingSupported) {
      alert("Your Browser does not support recording.");
      return;
    }
    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        handleUploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("recording started");
    };

    recorder.current.onstop = () => {
      console.log("recording finished");
    };

    recorder.current.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  }

  async function handleUploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      { method: "POST", body: formData }
    );

    const result = await response.json();

    console.log(result);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen  flex-col items-center justify-center gap-3 ">
      {isRecording ? (
        <Button onClick={handleStopRecording}>Stop Recording</Button>
      ) : (
        <Button onClick={handleRecording}>Record Audio</Button>
      )}
      {isRecording ? <p>Recording...</p> : <p>Paused</p>}
    </div>
  );
}
