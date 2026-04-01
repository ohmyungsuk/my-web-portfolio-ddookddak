package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.RequestDto;
import com.portfolio.taejuneng.mapper.RequestMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private final RequestMapper requestMapper;

    public RequestService(RequestMapper requestMapper) {
        this.requestMapper = requestMapper;
    }

    public void saveRequest(RequestDto dto) {
        requestMapper.insertRequest(dto);
    }

    public List<RequestDto> getMyRequests(Long userId) {
        return requestMapper.findByUserId(userId);
    }

    public RequestDto getRequestDetail(Long id) {
        return requestMapper.findById(id);
    }
}