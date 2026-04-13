package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.RequestDto;
import com.portfolio.taejuneng.service.RequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "https://ohmyungsuk.github.io"
        },
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.OPTIONS
        }
)
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/requests")
    public void createRequest(@RequestBody RequestDto dto) {
        requestService.createRequest(dto);
    }

    @GetMapping("/requests")
    public List<RequestDto> getAllRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("/requests/my")
    public List<RequestDto> getMyRequests(@RequestParam Long userId) {
        return requestService.getMyRequests(userId);
    }

    @GetMapping("/requests/assigned")
    public List<RequestDto> getAssignedRequests(@RequestParam Long assignedUserId) {
        return requestService.getAssignedRequests(assignedUserId);
    }

    @GetMapping("/requests/detail")
    public RequestDto getRequestById(@RequestParam Long id) {
        return requestService.getRequestById(id);
    }

    @PutMapping("/requests/status")
    public void updateStatus(@RequestParam Long id, @RequestParam String status) {
        requestService.updateStatus(id, status);
    }

    @PutMapping("/requests/accept")
    public int acceptRequest(@RequestParam Long requestId, @RequestParam Long assignedUserId) {
        return requestService.acceptRequest(requestId, assignedUserId);
    }
}