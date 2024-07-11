package com.backend.ToDoList.repository;

import com.backend.ToDoList.model.Object;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObjectRepository extends JpaRepository<Object, Long> {
    List<Object> findByCategory(String category);
}
