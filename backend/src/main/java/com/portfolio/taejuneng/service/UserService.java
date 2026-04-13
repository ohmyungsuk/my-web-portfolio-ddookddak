package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.UserSignupDto;
import com.portfolio.taejuneng.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public void signup(UserSignupDto dto) {
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encodedPassword);
        userMapper.insertUser(dto);
    }

    public UserSignupDto login(UserSignupDto dto) {
        UserSignupDto savedUser = userMapper.findByUsername(dto.getUsername());

        if (savedUser == null) {
            return null;
        }

        boolean isMatch = passwordEncoder.matches(
                dto.getPassword(),
                savedUser.getPassword()
        );

        if (!isMatch) {
            return null;
        }

        return savedUser;
    }

    public UserSignupDto supabaseSync(UserSignupDto dto) {
        UserSignupDto foundUser = userMapper.findByEmail(dto.getEmail());

        if (foundUser != null) {
            return foundUser;
        }

        String displayName = dto.getName();

        if (displayName == null || displayName.isBlank()) {
            if (dto.getEmail() != null && dto.getEmail().contains("@")) {
                displayName = dto.getEmail().split("@")[0];
            } else {
                displayName = "사용자";
            }
        }

        UserSignupDto newUser = new UserSignupDto();
        newUser.setUsername(dto.getEmail());
        newUser.setPassword(passwordEncoder.encode("SUPABASE_ONLY"));
        newUser.setName(displayName);
        newUser.setNickname(displayName);
        newUser.setEmail(dto.getEmail());
        newUser.setPhoneNumber("");

        userMapper.insertUser(newUser);

        return userMapper.findByEmail(dto.getEmail());
    }
}