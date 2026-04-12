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
            r.id,
            r.user_id AS userId,
            r.title,
            r.category,
            r.location,
            r.content,
            r.status,
            r.assigned_user_id AS assignedUserId,
            u.nickname AS assignedUsername,
            r.created_at AS createdAt
        FROM requests r
        LEFT JOIN users u
          ON r.assigned_user_id = u.id
        WHERE r.user_id = #{userId}
        ORDER BY r.id DESC
    """)
    List<RequestDto> findByUserId(Long userId);

    @Select("""
        SELECT
            r.id,
            r.user_id AS userId,
            r.title,
            r.category,
            r.location,
            r.content,
            r.status,
            r.assigned_user_id AS assignedUserId,
            u.nickname AS assignedUsername,
            r.created_at AS createdAt
        FROM requests r
        LEFT JOIN users u
          ON r.assigned_user_id = u.id
        WHERE r.assigned_user_id = #{assignedUserId}
        ORDER BY r.id DESC
    """)
    List<RequestDto> findByAssignedUserId(Long assignedUserId);

    @Select("""
        SELECT
            r.id,
            r.user_id AS userId,
            r.title,
            r.category,
            r.location,
            r.content,
            r.status,
            r.assigned_user_id AS assignedUserId,
            u.nickname AS assignedUsername,
            r.created_at AS createdAt
        FROM requests r
        LEFT JOIN users u
          ON r.assigned_user_id = u.id
        WHERE r.id = #{id}
    """)
    RequestDto findById(Long id);

    @Select("""
        SELECT
            r.id,
            r.user_id AS userId,
            r.title,
            r.category,
            r.location,
            r.content,
            r.status,
            r.assigned_user_id AS assignedUserId,
            u.nickname AS assignedUsername,
            r.created_at AS createdAt
        FROM requests r
        LEFT JOIN users u
          ON r.assigned_user_id = u.id
        ORDER BY r.id DESC
    """)
    List<RequestDto> findAll();

    @Update("""
    UPDATE requests
    SET status = #{status}
    WHERE id = #{id}
""")
    void updateStatus(@Param("id") Long id, @Param("status") String statuㄹs);

    @Update("""
    UPDATE requests
    SET assigned_user_id = #{assignedUserId},
        status = '견적 협의중'
    WHERE id = #{requestId}
      AND assigned_user_id IS NULL
""")
    int acceptRequest(@Param("requestId") Long requestId,
                      @Param("assignedUserId") Long assignedUserId);
}