package com.portfolio.taejuneng.mapper;

import com.portfolio.taejuneng.dto.RequestDto;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface RequestMapper {

    @Insert("""
    INSERT INTO requests (
        user_id,
        title,
        category,
        location,
        content,
        status,
        assigned_user_id
    )
    VALUES (
        #{userId},
        #{title},
        #{category},
        #{location},
        #{content},
        #{status},
        #{assignedUserId}
    )
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
            assigned_user_id AS assignedUserId,
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
            assigned_user_id AS assignedUserId,
            created_at AS createdAt
        FROM requests
        WHERE id = #{id}
    """)
    RequestDto findById(Long id);

    @Select("""
        SELECT
            id,
            user_id AS userId,
            title,
            category,
            location,
            content,
            status,
            assigned_user_id AS assignedUserId,
            created_at AS createdAt
        FROM requests
        ORDER BY id DESC
    """)
    List<RequestDto> findAll();

    @Update("""
    UPDATE requests
    SET status = #{status}
    WHERE id = #{id}
""")
    void updateStatus(@Param("id") Long id, @Param("status") String status);

    @Update("""
    UPDATE requests
    SET assigned_user_id = #{assignedUserId},
        status = '진행중'
    WHERE id = #{requestId}
      AND assigned_user_id IS NULL
""")
    int acceptRequest(@Param("requestId") Long requestId,
                      @Param("assignedUserId") Long assignedUserId);
}