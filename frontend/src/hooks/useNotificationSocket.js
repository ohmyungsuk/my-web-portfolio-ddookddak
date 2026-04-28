import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function getWebSocketUrl() {
  if (API_BASE_URL.startsWith("https://")) {
    return API_BASE_URL.replace("https://", "wss://") + "/ws-notifications";
  }

  if (API_BASE_URL.startsWith("http://")) {
    return API_BASE_URL.replace("http://", "ws://") + "/ws-notifications";
  }

  return "ws://localhost:8080/ws-notifications";
}

function useNotificationSocket(loginUser, onNotificationReceived) {
  const stompClientRef = useRef(null);

  useEffect(() => {
    console.log("알림 소켓 훅 실행됨:", loginUser);

    const userId = loginUser?.id || loginUser?.supabaseUserId;

    if (!userId) {
      console.log("알림 소켓 연결 안 함: userId 없음");
      return;
    }

    const client = new Client({
      brokerURL: getWebSocketUrl(),
      reconnectDelay: 5000,

      debug: (message) => {
        console.log("[STOMP]", message);
      },

      onConnect: () => {
        console.log("알림 WebSocket 연결 성공:", userId);

        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          try {
            const notification = JSON.parse(message.body);

            console.log("실시간 알림 수신:", notification);

            if (onNotificationReceived) {
              onNotificationReceived(notification);
            }
          } catch (error) {
            console.error("알림 메시지 파싱 실패:", error);
          }
        });
      },

      onStompError: (frame) => {
        console.error("STOMP 에러:", frame);
      },

      onWebSocketError: (error) => {
        console.error("WebSocket 에러:", error);
      },

      onWebSocketClose: (event) => {
        console.log("WebSocket 연결 종료:", event);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
  }, [loginUser, onNotificationReceived]);
}

export default useNotificationSocket;