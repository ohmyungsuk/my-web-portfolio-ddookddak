package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.UserSignupDto;
import com.portfolio.taejuneng.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public void signup(UserSignupDto dto) {
        userMapper.insertUser(dto);
    }

    public boolean login(UserSignupDto dto) {
        return userMapper.login(dto) > 0;
    }
}