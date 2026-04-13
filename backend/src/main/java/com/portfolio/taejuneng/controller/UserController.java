package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.UserSignupDto;
import com.portfolio.taejuneng.service.UserService;
import org.springframework.web.bind.annotation.*;

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
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/signup")
    public String signup(@RequestBody UserSignupDto dto) {
        userService.signup(dto);
        return "회원가입 성공";
    }

    @PostMapping("/users/login")
    public UserSignupDto login(@RequestBody UserSignupDto dto) {
        return userService.login(dto);
    }

    @PostMapping("/users/supabase-sync")
    public UserSignupDto supabaseSync(@RequestBody UserSignupDto dto) {
        return userService.supabaseSync(dto);
    }
}