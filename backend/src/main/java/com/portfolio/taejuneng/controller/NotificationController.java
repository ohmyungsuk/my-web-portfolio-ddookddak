package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.NotificationCreateDto;
import com.portfolio.taejuneng.dto.NotificationDto;
import com.portfolio.taejuneng.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<NotificationDto> createNotification(
            @RequestBody NotificationCreateDto dto
    ) {
        NotificationDto createdNotification = notificationService.createNotification(dto);
        return ResponseEntity.ok(createdNotification);
    }

    @GetMapping
    public ResponseEntity<List<NotificationDto>> getNotifications(
            @RequestParam String recipientId
    ) {
        List<NotificationDto> notifications =
                notificationService.getNotifications(recipientId);

        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Integer> getUnreadCount(
            @RequestParam String recipientId
    ) {
        int unreadCount = notificationService.getUnreadCount(recipientId);
        return ResponseEntity.ok(unreadCount);
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable String notificationId,
            @RequestParam String recipientId
    ) {
        notificationService.markAsRead(notificationId, recipientId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead(
            @RequestParam String recipientId
    ) {
        notificationService.markAllAsRead(recipientId);
        return ResponseEntity.noContent().build();
    }
}