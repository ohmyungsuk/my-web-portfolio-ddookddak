package com.portfolio.taejuneng.mapper;

import com.portfolio.taejuneng.dto.RequestDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RequestMapper {

    @Insert("""
        INSERT INTO requests (user_id, title, category, location, content, status)
        VALUES (#{userId}, #{title}, #{category}, #{location}, #{content}, #{status})
    """)
    void insertRequest(RequestDto dto);

    @Select("""
        SELECT
            id,
            user_id AS userId,
            title,
            category,
            location,
            content,
            status,
            created_at AS createdAt
        FROM requests
        WHERE user_id = #{userId}
        ORDER BY id DESC
    """)
    List<RequestDto> findByUserId(Long userId);

    @Select("""
        SELECT
            id,
            user_id AS userId,
            title,
            category,
            location,
            content,
            status,
            created_at AS createdAt
        FROM requests
        WHERE id = #{id}
    """)
    RequestDto findById(Long id);
}