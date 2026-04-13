package com.portfolio.taejuneng.mapper;

import com.portfolio.taejuneng.dto.UserSignupDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Insert("""
        INSERT INTO users (
            username,
            password,
            name,
            nickname,
            email,
            phone_number,
            role
        )
        VALUES (
            #{username},
            #{password},
            #{name},
            #{nickname},
            #{email},
            #{phoneNumber},
            'user'
        )
        """)
    void insertUser(UserSignupDto dto);

    @Select("""
        SELECT
            id,
            username,
            password,
            name,
            nickname,
            email,
            phone_number AS phoneNumber,
            role
        FROM users
        WHERE username = #{username}
        """)
    UserSignupDto findByUsername(String username);

    @Select("""
        SELECT
            id,
            username,
            password,
            name,
            nickname,
            email,
            phone_number AS phoneNumber,
            role
        FROM users
        WHERE email = #{email}
        """)
    UserSignupDto findByEmail(String email);
}