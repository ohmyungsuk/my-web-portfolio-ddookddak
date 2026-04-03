package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.RequestDto;
import com.portfolio.taejuneng.service.RequestService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.OPTIONS
        }
)
@RestController
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/requests")
    public String createRequest(@RequestBody RequestDto dto) {
        requestService.createRequest(dto);
        return "요청 등록 성공";
    }

    @GetMapping("/requests/my")
    public List<RequestDto> getMyRequests(@RequestParam Long userId) {
        return requestService.getMyRequests(userId);
    }

    @GetMapping("/requests/detail")
    public RequestDto getRequestDetail(@RequestParam Long id) {
        return requestService.getRequestById(id);
    }

    @GetMapping("/requests")
    public List<RequestDto> getAllRequests() {
        return requestService.getAllRequests();
    }

    @PutMapping("/requests/status")
    public String updateStatus(@RequestParam Long id,
                               @RequestParam String status) {
        requestService.updateStatus(id, status);
        return "상태 변경 성공";
    }

    @PutMapping("/requests/accept")
    public String acceptRequest(@RequestParam Long requestId,
                                @RequestParam Long assignedUserId) {
        int result = requestService.acceptRequest(requestId, assignedUserId);

        if (result > 0) {
            return "요청 수락 성공";
        } else {
            return "이미 다른 사람이 수락했거나 요청이 없습니다.";
        }
    }
}