package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.RequestDto;
import com.portfolio.taejuneng.mapper.RequestMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    private final RequestMapper requestMapper;

    public RequestServiceImpl(RequestMapper requestMapper) {
        this.requestMapper = requestMapper;
    }

    @Override
    public void createRequest(RequestDto dto) {
        requestMapper.insertRequest(dto);
    }

    @Override
    public List<RequestDto> getMyRequests(Long userId) {
        return requestMapper.findByUserId(userId);
    }

    @Override
    public RequestDto getRequestById(Long id) {
        return requestMapper.findById(id);
    }

    @Override
    public void updateStatus(Long id, String status) {
        requestMapper.updateStatus(id, status);
    }

    @Override
    public List<RequestDto> getAllRequests() {
        return requestMapper.findAll();
    }

    @Override
    public int acceptRequest(Long requestId, Long assignedUserId) {
        return requestMapper.acceptRequest(requestId, assignedUserId);
    }
}