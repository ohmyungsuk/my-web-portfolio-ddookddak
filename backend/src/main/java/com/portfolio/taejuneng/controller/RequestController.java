package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.RequestDto;
import com.portfolio.taejuneng.service.RequestService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/requests")
    public String createRequest(@RequestBody RequestDto dto) {
        requestService.saveRequest(dto);
        return "요청 등록 성공";
    }

    @GetMapping("/requests/my")
    public List<RequestDto> getMyRequests(@RequestParam Long userId) {
        return requestService.getMyRequests(userId);
    }
    @GetMapping("/requests/detail")
    public RequestDto getRequestDetail(@RequestParam Long id) {
        return requestService.getRequestDetail(id);
    }
}