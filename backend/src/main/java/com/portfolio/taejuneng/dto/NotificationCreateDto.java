package com.portfolio.taejuneng.dto;

public class NotificationCreateDto {
    private String recipientId;
    private String actorId;
    private String type;
    private String title;
    private String message;
    private Long requestId;
    private String chatRoomId;
    private String targetUrl;
    private String metadata;

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
}