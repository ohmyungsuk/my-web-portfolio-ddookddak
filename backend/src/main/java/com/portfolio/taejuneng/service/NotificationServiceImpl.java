package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.NotificationCreateDto;
import com.portfolio.taejuneng.dto.NotificationDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final JdbcTemplate jdbcTemplate;
    private final NotificationPublisher notificationPublisher;

    public NotificationServiceImpl(
            JdbcTemplate jdbcTemplate,
            NotificationPublisher notificationPublisher
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.notificationPublisher = notificationPublisher;
    }

    @Override
    public NotificationDto createNotification(NotificationCreateDto dto) {
        validateCreateDto(dto);

        String metadata = dto.getMetadata();

        if (metadata == null || metadata.isBlank()) {
            metadata = "{}";
        }

        String sql = """
                insert into public.notifications (
                    recipient_id,
                    actor_id,
                    type,
                    title,
                    message,
                    request_id,
                    chat_room_id,
                    target_url,
                    metadata
                )
                values (
                    ?::uuid,
                    nullif(?, '')::uuid,
                    ?,
                    ?,
                    ?,
                    ?,
                    nullif(?, '')::uuid,
                    ?,
                    ?::jsonb
                )
                returning
                    id::text,
                    recipient_id::text,
                    actor_id::text,
                    type,
                    title,
                    message,
                    request_id,
                    chat_room_id::text,
                    target_url,
                    metadata::text,
                    is_read,
                    read_at,
                    created_at
                """;

        NotificationDto createdNotification = jdbcTemplate.queryForObject(
                sql,
                this::mapNotification,
                dto.getRecipientId(),
                safeValue(dto.getActorId()),
                dto.getType(),
                dto.getTitle(),
                dto.getMessage(),
                dto.getRequestId(),
                safeValue(dto.getChatRoomId()),
                dto.getTargetUrl(),
                metadata
        );

        if (createdNotification != null) {
            notificationPublisher.publish(createdNotification);
        }

        return createdNotification;
    }

    @Override
    public List<NotificationDto> getNotifications(String recipientId) {
        String sql = """
                select
                    id::text,
                    recipient_id::text,
                    actor_id::text,
                    type,
                    title,
                    message,
                    request_id,
                    chat_room_id::text,
                    target_url,
                    metadata::text,
                    is_read,
                    read_at,
                    created_at
                from public.notifications
                where recipient_id = ?::uuid
                order by created_at desc
                limit 50
                """;

        return jdbcTemplate.query(sql, this::mapNotification, recipientId);
    }

    @Override
    public int getUnreadCount(String recipientId) {
        String sql = """
                select count(*)
                from public.notifications
                where recipient_id = ?::uuid
                  and is_read = false
                """;

        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, recipientId);

        return count == null ? 0 : count;
    }

    @Override
    public void markAsRead(String notificationId, String recipientId) {
        String sql = """
                update public.notifications
                set is_read = true,
                    read_at = now()
                where id = ?::uuid
                  and recipient_id = ?::uuid
                """;

        jdbcTemplate.update(sql, notificationId, recipientId);
    }

    @Override
    public void markAllAsRead(String recipientId) {
        String sql = """
                update public.notifications
                set is_read = true,
                    read_at = now()
                where recipient_id = ?::uuid
                  and is_read = false
                """;

        jdbcTemplate.update(sql, recipientId);
    }

    private NotificationDto mapNotification(ResultSet rs, int rowNum) throws SQLException {
        NotificationDto dto = new NotificationDto();

        dto.setId(rs.getString("id"));
        dto.setRecipientId(rs.getString("recipient_id"));
        dto.setActorId(rs.getString("actor_id"));
        dto.setType(rs.getString("type"));
        dto.setTitle(rs.getString("title"));
        dto.setMessage(rs.getString("message"));

        long requestId = rs.getLong("request_id");
        dto.setRequestId(rs.wasNull() ? null : requestId);

        dto.setChatRoomId(rs.getString("chat_room_id"));
        dto.setTargetUrl(rs.getString("target_url"));
        dto.setMetadata(rs.getString("metadata"));
        dto.setRead(rs.getBoolean("is_read"));

        if (rs.getObject("read_at") != null) {
            dto.setReadAt(rs.getObject("read_at", java.time.OffsetDateTime.class));
        }

        if (rs.getObject("created_at") != null) {
            dto.setCreatedAt(rs.getObject("created_at", java.time.OffsetDateTime.class));
        }

        return dto;
    }

    private void validateCreateDto(NotificationCreateDto dto) {
        if (dto.getRecipientId() == null || dto.getRecipientId().isBlank()) {
            throw new IllegalArgumentException("recipientId는 필수입니다.");
        }

        if (dto.getType() == null || dto.getType().isBlank()) {
            throw new IllegalArgumentException("type은 필수입니다.");
        }

        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new IllegalArgumentException("title은 필수입니다.");
        }

        if (dto.getMessage() == null || dto.getMessage().isBlank()) {
            throw new IllegalArgumentException("message는 필수입니다.");
        }
    }

    private String safeValue(String value) {
        return value == null ? "" : value;
    }
}