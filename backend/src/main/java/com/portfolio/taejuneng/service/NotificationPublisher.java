package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.NotificationDto;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class NotificationPublisher {

    private final StringRedisTemplate stringRedisTemplate;
    private final ChannelTopic notificationTopic;
    private final ObjectMapper objectMapper;

    public NotificationPublisher(
            StringRedisTemplate stringRedisTemplate,
            ChannelTopic notificationTopic,
            ObjectMapper objectMapper
    ) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.notificationTopic = notificationTopic;
        this.objectMapper = objectMapper;
    }

    public void publish(NotificationDto notification) {
        try {
            String message = objectMapper.writeValueAsString(notification);
            stringRedisTemplate.convertAndSend(notificationTopic.getTopic(), message);
        } catch (Exception e) {
            throw new RuntimeException("알림 메시지 Redis 발행에 실패했습니다.", e);
        }
    }
}