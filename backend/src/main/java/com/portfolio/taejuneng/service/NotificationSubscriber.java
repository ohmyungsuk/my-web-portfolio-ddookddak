package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.NotificationDto;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class NotificationSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationSubscriber(
            ObjectMapper objectMapper,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.objectMapper = objectMapper;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String body = new String(message.getBody());
            NotificationDto notification =
                    objectMapper.readValue(body, NotificationDto.class);

            String recipientId = notification.getRecipientId();

            if (recipientId == null || recipientId.isBlank()) {
                return;
            }

            messagingTemplate.convertAndSend(
                    "/topic/notifications/" + recipientId,
                    notification
            );
        } catch (Exception e) {
            throw new RuntimeException("Redis 알림 수신 처리에 실패했습니다.", e);
        }
    }
}