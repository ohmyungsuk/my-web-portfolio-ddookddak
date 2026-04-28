package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.NotificationDto;
import com.portfolio.taejuneng.dto.RequestCreatedNotificationEventDto;
import com.portfolio.taejuneng.service.NotificationEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification-events")
@CrossOrigin(origins = "*")
public class NotificationEventController {

    private final NotificationEventService notificationEventService;

    public NotificationEventController(
            NotificationEventService notificationEventService
    ) {
        this.notificationEventService = notificationEventService;
    }

    @PostMapping("/request-created")
    public ResponseEntity<List<NotificationDto>> notifyRequestCreated(
            @RequestBody RequestCreatedNotificationEventDto eventDto
    ) {
        List<NotificationDto> notifications =
                notificationEventService.notifyRequestCreated(eventDto);

        return ResponseEntity.ok(notifications);
    }
}