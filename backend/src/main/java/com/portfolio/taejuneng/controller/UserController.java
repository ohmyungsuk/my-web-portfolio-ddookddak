package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.UserSignupDto;
import com.portfolio.taejuneng.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody UserSignupDto dto) {
        userService.signup(dto);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserSignupDto dto) {
        boolean result = userService.login(dto);

        if (result) {
            return "로그인 성공";
        } else {
            return "로그인 실패";
        }
    }
}