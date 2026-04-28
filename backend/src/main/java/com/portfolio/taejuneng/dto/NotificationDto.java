package com.portfolio.taejuneng.dto;

import java.time.OffsetDateTime;

public class NotificationDto {
    private String id;
    private String recipientId;
    private String actorId;
    private String type;
    private String title;
    private String message;
    private Long requestId;
    private String chatRoomId;
    private String targetUrl;
    private String metadata;
    private boolean read;
    private OffsetDateTime readAt;
    private OffsetDateTime createdAt;

    public String getId() {
        return id;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public String getActorId() {
        return actorId;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Long getRequestId() {
        return requestId;
    }

    public String getChatRoomId() {
        return chatRoomId;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public String getMetadata() {
        return metadata;
    }

    public boolean isRead() {
        return read;
    }

    public OffsetDateTime getReadAt() {
        return readAt;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public void setActorId(String actorId) {
        this.actorId = actorId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public void setChatRoomId(String chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public void setReadAt(OffsetDateTime readAt) {
        this.readAt = readAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}