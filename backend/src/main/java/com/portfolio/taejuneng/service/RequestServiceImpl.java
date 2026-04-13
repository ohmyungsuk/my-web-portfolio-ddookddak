package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.RequestDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    @Override
    public void createRequest(RequestDto dto) {
    }

    @Override
    public List<RequestDto> getMyRequests(Long userId) {
        return new ArrayList<>();
    }

    @Override
    public List<RequestDto> getAssignedRequests(Long assignedUserId) {
        return new ArrayList<>();
    }

    @Override
    public RequestDto getRequestById(Long id) {
        return null;
    }

    @Override
    public void updateStatus(Long id, String status) {
    }

    @Override
    public List<RequestDto> getAllRequests() {
        return new ArrayList<>();
    }

    @Override
    public int acceptRequest(Long requestId, Long assignedUserId) {
        return 0;
    }
}