package com.portfolio.taejuneng.mapper;

import com.portfolio.taejuneng.dto.UserSignupDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Insert("""
        INSERT INTO users (username, password, name)
        VALUES (#{username}, #{password}, #{name})
    """)
    void insertUser(UserSignupDto dto);

    @Select("""
        SELECT COUNT(*)
        FROM users
        WHERE username = #{username}
        AND password = #{password}
    """)
    int login(UserSignupDto dto);
}