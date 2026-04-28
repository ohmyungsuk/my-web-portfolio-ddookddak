package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.NotificationCreateDto;
import com.portfolio.taejuneng.dto.NotificationDto;

import java.util.List;

public interface NotificationService {
    NotificationDto createNotification(NotificationCreateDto dto);

    List<NotificationDto> getNotifications(String recipientId);

    int getUnreadCount(String recipientId);

    void markAsRead(String notificationId, String recipientId);

    void markAllAsRead(String recipientId);
}