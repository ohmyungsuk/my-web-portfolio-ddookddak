import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const SOCKET_ENABLED =
  import.meta.env.VITE_NOTIFICATION_SOCKET_ENABLED !== "false";

const STOMP_DEBUG = import.meta.env.VITE_STOMP_DEBUG === "true";

function getWebSocketUrl() {
  if (API_BASE_URL.startsWith("https://")) {
    return API_BASE_URL.replace("https://", "wss://") + "/ws-notifications";
  }

  if (API_BASE_URL.startsWith("http://")) {
    return API_BASE_URL.replace("http://", "ws://") + "/ws-notifications";
  }

  return "ws://localhost:8080/ws-notifications";
}

function isLocalHost(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0"
  );
}

function canConnectToNotificationServer() {
  try {
    const apiUrl = new URL(API_BASE_URL);
    const apiHost = apiUrl.hostname;
    const pageHost = window.location.hostname;

    // 배포된 GitHub Pages 같은 곳에서 localhost:8080으로 붙으려는 걸 막음
    if (isLocalHost(apiHost) && !isLocalHost(pageHost)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function useNotificationSocket(loginUser, onNotificationReceived) {
  const stompClientRef = useRef(null);
  const errorShownRef = useRef(false);

  useEffect(() => {
    const userId = loginUser?.id || loginUser?.supabaseUserId;

    if (!SOCKET_ENABLED) {
      return;
    }

    if (!userId) {
      return;
    }

    if (!canConnectToNotificationServer()) {
      return;
    }

    const client = new Client({
      brokerURL: getWebSocketUrl(),

      // 중요:
      // 기존 5000이면 백엔드 꺼져 있을 때 5초마다 콘솔 오류가 계속 쌓임.
      // 0으로 두면 자동 무한 재연결을 하지 않음.
      reconnectDelay: 0,

      connectionTimeout: 3000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,

      debug: (message) => {
        if (STOMP_DEBUG) {
          console.log("[STOMP]", message);
        }
      },

      onConnect: () => {
        errorShownRef.current = false;
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
        if (!errorShownRef.current) {
          console.warn("알림 STOMP 연결 오류:", frame);
          errorShownRef.current = true;
        }
      },

      onWebSocketError: () => {
        if (!errorShownRef.current) {
          console.warn(
            "알림 서버에 연결하지 못했습니다. 백엔드가 꺼져 있으면 무시해도 됩니다."
          );
          errorShownRef.current = true;
        }
      },

      onWebSocketClose: (event) => {
        if (event.code === 1000) {
          return;
        }

        if (!errorShownRef.current) {
          console.warn("알림 WebSocket 연결이 종료되었습니다:", event);
          errorShownRef.current = true;
        }
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