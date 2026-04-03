package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.RequestDto;

import java.util.List;

public interface RequestService {

    void createRequest(RequestDto dto);

    List<RequestDto> getMyRequests(Long userId);

    RequestDto getRequestById(Long id);

    void updateStatus(Long id, String status);

    List<RequestDto> getAllRequests();

    int acceptRequest(Long requestId, Long assignedUserId);
}