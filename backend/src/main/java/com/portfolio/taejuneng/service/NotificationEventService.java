package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.NotificationCreateDto;
import com.portfolio.taejuneng.dto.NotificationDto;
import com.portfolio.taejuneng.dto.RequestCreatedNotificationEventDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class NotificationEventService {

    private final JdbcTemplate jdbcTemplate;
    private final NotificationService notificationService;

    public NotificationEventService(
            JdbcTemplate jdbcTemplate,
            NotificationService notificationService
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.notificationService = notificationService;
    }

    public List<NotificationDto> notifyRequestCreated(
            RequestCreatedNotificationEventDto eventDto
    ) {
        validateRequestCreatedEvent(eventDto);

        Set<String> recipientIds = new LinkedHashSet<>();

        recipientIds.addAll(findAdminRecipients());
        recipientIds.addAll(findWorkerRecipientsByCategory(eventDto.getCategory()));

        recipientIds.removeIf(recipientId ->
                recipientId == null ||
                        recipientId.isBlank() ||
                        recipientId.equals(eventDto.getActorId())
        );

        List<NotificationDto> createdNotifications = new ArrayList<>();

        for (String recipientId : recipientIds) {
            NotificationCreateDto notificationDto = new NotificationCreateDto();

            notificationDto.setRecipientId(recipientId);
            notificationDto.setActorId(eventDto.getActorId());
            notificationDto.setType("REQUEST_CREATED");
            notificationDto.setTitle(makeRequestCreatedTitle(eventDto));
            notificationDto.setMessage(makeRequestCreatedMessage(eventDto));
            notificationDto.setRequestId(eventDto.getRequestId());
            notificationDto.setTargetUrl("/requests/" + eventDto.getRequestId());
            notificationDto.setMetadata(makeMetadata(eventDto));

            NotificationDto createdNotification =
                    notificationService.createNotification(notificationDto);

            createdNotifications.add(createdNotification);
        }

        return createdNotifications;
    }

    private List<String> findAdminRecipients() {
        String sql = """
                select p.id::text
                from public.profiles p
                left join public.notification_preferences np
                    on np.user_id = p.id
                where lower(coalesce(p.role, '')) = 'admin'
                  and coalesce(np.admin_alert, true) = true
                """;

        return jdbcTemplate.queryForList(sql, String.class);
    }

    private List<String> findWorkerRecipientsByCategory(String category) {
        if (category == null || category.isBlank()) {
            return List.of();
        }

        String sql = """
                select distinct p.id::text
                from public.profiles p
                join public.worker_categories wc
                    on wc.worker_id = p.id
                left join public.notification_preferences np
                    on np.user_id = p.id
                where lower(coalesce(p.role, '')) = 'worker'
                  and lower(wc.category) = lower(?)
                  and wc.is_enabled = true
                  and coalesce(np.new_request_alert, true) = true
                """;

        return jdbcTemplate.queryForList(sql, String.class, category);
    }

    private String makeRequestCreatedTitle(RequestCreatedNotificationEventDto eventDto) {
        if (eventDto.getCategory() == null || eventDto.getCategory().isBlank()) {
            return "새 요청이 등록되었습니다";
        }

        return "새 " + eventDto.getCategory() + " 요청이 등록되었습니다";
    }

    private String makeRequestCreatedMessage(RequestCreatedNotificationEventDto eventDto) {
        if (eventDto.getTitle() != null && !eventDto.getTitle().isBlank()) {
            return "'" + eventDto.getTitle() + "' 요청이 새로 등록되었습니다.";
        }

        return "새로운 유지보수 요청이 등록되었습니다.";
    }

    private String makeMetadata(RequestCreatedNotificationEventDto eventDto) {
        String category = eventDto.getCategory() == null
                ? ""
                : eventDto.getCategory().replace("\"", "\\\"");

        return """
                {"source":"request-created","category":"%s"}
                """.formatted(category).trim();
    }

    private void validateRequestCreatedEvent(RequestCreatedNotificationEventDto eventDto) {
        if (eventDto.getRequestId() == null) {
            throw new IllegalArgumentException("requestId는 필수입니다.");
        }

        if (eventDto.getActorId() == null || eventDto.getActorId().isBlank()) {
            throw new IllegalArgumentException("actorId는 필수입니다.");
        }
    }
}