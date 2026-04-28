package com.portfolio.taejuneng.dto;

public class RequestCreatedNotificationEventDto {
    private Long requestId;
    private String actorId;
    private String category;
    private String title;
    private String message;

    public Long getRequestId() {
        return requestId;
    }

    public String getActorId() {
        return actorId;
    }

    public String getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public void setActorId(String actorId) {
        this.actorId = actorId;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}